<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="搜索关键词" style="margin-bottom:30px;" />
    <el-button type="primary" size="small" style="margin-bottom:20px" @click="onAddCategory">新增一级类目</el-button>
    <el-tree
      ref="treeView"
      v-loading="listLoading"
      :data="list"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      class="filter-tree"
      node-key="id"
      default-expand-all
      draggable
      @node-drop="handleDrop"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span class="left">
          {{ node.label }}
          <el-button
            type="text"
            size="mini"
            @click=";"
          >
            <i class="el-icon-d-caret" />
          </el-button>
        </span>
        <span class="right">
          <span>
            <el-button
              v-if="node.level === 1"
              type="text"
              size="mini"
              @click="onAddCategory(data)"
            >
              <i class="el-icon-plus" />
            </el-button>
          </span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="onEdit(data)"
            >
              <i class="el-icon-edit-outline" />
            </el-button>
          </span>
          <span>
            <el-button
              v-if="node.data.children.length == 0"
              type="text"
              size="mini"
              @click="onDel(data)"
            >
              <i class="el-icon-delete" />
            </el-button>
          </span>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { getCategoryList2, delCategory, moveCategory } from '@/api/category'

export default {
  inject: ['reload'],
  data() {
    window.id = 1000
    return {
      filterText: '',
      list: null,
      listLoading: true,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.treeView.filter(val)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCategoryList2({}, (res) => {
        this.list = res.items
        this.listLoading = false
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    append(data) {
      const newChild = { id: window.id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    onAddCategory(data) {
      this.$router.push({ name: '新增类目', params: { row: { parent: data.id }}})
    },
    onEdit(row) {
      this.$router.push({ name: '编辑类目', params: { row: row }})
    },
    onDel(row) {
      delCategory(row, (res) => {
        if (res.code === 20000) {
          this.reload()
        }
      })
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('Drag: %s: (%d:%s) => (%d:%s)', dropType, draggingNode.data.id, draggingNode.data.name, dropNode.data.id, dropNode.data.name)
      this.listLoading = true
      moveCategory({ dragId: draggingNode.data.id, dropId: dropNode.data.id, dropType }, (res) => {
        if (res.code === 20000) {
          this.listLoading = false
        }
      })
    },
    allowDrop(draggingNode, dropNode, type) {
      if (type === 'prev') {
        return true
      }
      return false
    },
    allowDrag(draggingNode) {
      return true
    }
  }
}
</script>

<style>
  .filter-tree {
    width: 450px;
  }
  .custom-tree-node {
    font-size: 14px;
    line-height: 26px;
    width: 100%;
  }
  .custom-tree-node .right {
    float: right;
    /*text-align: left;*/
    width: 80px;
  }
  .custom-tree-node .right span {
    width: 20px;
    display: inline-block;
  }
  .custom-tree-node .left button {
    margin: 0;
  }
</style>
