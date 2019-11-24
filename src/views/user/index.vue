<template>
  <div class="app-container">
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
      <el-table-column label="用户名" width="110">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="描述">
        <template slot-scope="scope">
          {{ scope.row.introduction }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="110" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="80px" alt="头像">
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" class-name="status-col" label="角色" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roles | rolesFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="lastLoginTime" label="上次登录时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.lastLoginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="lastLoginIP" label="上次登录IP" width="140">
        <template slot-scope="scope">
          <i class="el-icon-location" />
          <span>{{ scope.row.lastLoginIP }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-remove" :data-id="scope.row.id">锁定</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/user'

export default {
  filters: {
    rolesFilter(roles) {
      var r = []
      for (var i in roles) {
        if (roles[i].indexOf('admin') >= 0) {
          r.push('管理员')
        } else if (roles[i].indexOf('editor') >= 0) {
          r.push('普通用户')
        }
      }
      return r.join(',')
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
    }
  }
}
</script>
