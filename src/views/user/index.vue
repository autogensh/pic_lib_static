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
      <el-table-column :show-overflow-tooltip="true" align="center" label="用户名" width="100">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.introduction }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="110" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="80px" alt="头像">
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" class-name="status-col" label="角色" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role | roleFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="lastLoginTime" label="最后登录时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.lastLoginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="lastLoginIP" label="最后登录IP" width="140">
        <template slot-scope="scope">
          <i class="el-icon-location" />
          <span>{{ scope.row.lastLoginIP }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isLocked" type="danger">锁定</el-tag>
          <el-tag v-if="!scope.row.isLocked" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isLocked" type="success" size="mini" icon="el-icon-circle-check" @click="onLock(scope.row)">解锁</el-button>
          <el-button v-if="!scope.row.isLocked" type="danger" size="mini" icon="el-icon-remove" @click="onLock(scope.row)">锁定</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { list, lock } from '@/api/user'

export default {
  filters: {
    roleFilter(role) {
      if (role.indexOf('ADMIN') >= 0) {
        return '管理员'
      } else if (role.indexOf('USER') >= 0) {
        return '普通用户'
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
      list().then(response => {
        this.list = response.items
        this.listLoading = false
      })
    },
    onLock(row) {
      lock(row)
    }
  }
}
</script>
