<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 20px" @click="onAdd">新增类目</el-button>
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
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="素材类目名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createBy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="素材数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.materialCount }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.isDeleted | statusFilter">{{ scope.row.isDeleted | deleteFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateAt }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/category'

export default {
  filters: {
    statusFilter(status) {
      if (status) {
        return 'danger'
      } else {
        return 'success'
      }
    },
    deleteFilter(status) {
      if (status) {
        return '删除'
      } else {
        return '正常'
      }
    }
  },
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
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    onAdd() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
