<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="类目名" prop="name">
        <el-input
          v-model="form.name"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form)">保存</el-button>
      </el-form-item>
      <el-input v-model="form.createBy" type="hidden" />
      <el-input v-model="form.id" type="hidden" />
    </el-form>
  </div>
</template>

<script>

import { updateCategory } from '@/api/category'

export default {
  data() {
    var _id = ''
    var _name = ''
    var _createBy = ''
    if (!this.$route.params.row) {
      if (this.$route.params.path === '/category/edit') {
        this.$router.back(-1)
      }
    } else {
      _id = this.$route.params.row.id
      _name = this.$route.params.row.name
      _createBy = this.$route.params.row.createBy
    }
    return {
      form: {
        id: _id,
        name: _name,
        createBy: _createBy
      },
      rules: {
        name: [{ required: true, message: '请输入类目名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit(data) {
      updateCategory(data, (res) => {
        if (res.code === 20000) {
          this.$router.push({ name: '类目管理' })
        }
      })
    }
  }
}
</script>

<style>
.el-input__count-inner {
  background: transparent !important;
}
</style>
