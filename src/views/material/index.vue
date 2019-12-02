<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 20px" @click="onAdd">上传素材</el-button>
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
              <h3 v-html="scope.row.categoryName" />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编号" width="90">
        <template slot-scope="scope">
          {{ (currentPage - 1) * currentPageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="素材分类" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="素材名" width="110">
        <template slot-scope="scope">
          {{ scope.row.materialName }}
        </template>
      </el-table-column>
      <el-table-column label="封面图" width="110" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.coverImg" :src="scope.row.coverImg" width="80px" alt="封面图">
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="浏览数" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.views }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="下载数" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.downs }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="修改时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateAt }}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="上传者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="onEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="1"
      :page-sizes="[10, 15, 20, 30, 50, 100]"
      :page-size="currentPageSize"
      :total="total"
      style="margin: 15px 0"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getMaterialList, delMaterial } from '@/api/material'

export default {
  filters: {
    statusFilter(status) {
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      currentPage: 1,
      currentPageSize: 15
    }
  },
  created() {
    this.fetchData()
  },
  inject: ['reload'],
  methods: {
    fetchData() {
      this.listLoading = true
      getMaterialList({
        page: this.currentPage,
        pageSize: this.currentPageSize
      }, (res) => {
        this.list = res.items
        this.total = res.total
        this.listLoading = false
      })
    },
    onAdd() {
      this.$router.push({ name: '上传素材', params: { row: null }})
    },
    onEdit(row) {
      this.$router.push({ name: '修改素材', params: { row: row }})
    },
    onDel(id) {
      delMaterial(id, (res) => {
        if (res.code === 20000) {
          this.reload()
        }
      })
    },
    handleSizeChange(val) {
      this.currentPageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

