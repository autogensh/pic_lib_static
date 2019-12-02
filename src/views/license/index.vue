<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 20px" @click="onAdd">新增许可</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      stripe
      fit="fit"
      highlight-current-row
      style="width: 100%"
      size="medium"
    >
      <el-table-column type="expand" label="展开" width="60">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item>
              <h3 v-html="scope.row.title" />
              <div v-html="scope.row.content" />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="许可协议">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.updateAt }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="onEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLicenseList, delLicense } from '@/api/license'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  inject: ['reload'],
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getLicenseList({}, response => {
        this.list = response.items
        this.listLoading = false
      })
    },
    onAdd() {
      this.$router.push({ name: '新增许可', params: { row: null }})
    },
    onEdit(row) {
      this.$router.push({ name: '编辑许可', params: { row: row }})
    },
    onDel(row) {
      delLicense(row, (res) => {
        if (res.code === 20000) {
          this.reload()
        }
      })
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }

  .warn {
    color: #fd8320;
  }
</style>
