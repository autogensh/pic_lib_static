<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" @submit.native.prevent>
      <el-form-item label="类目名" prop="name">
        <el-input
          v-model="form.name"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="onSubmit(form)">保存</el-button>
      </el-form-item>
      <el-input v-model="form.parent" type="hidden" />
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
    var _parent = ''
    if (!this.$route.params.row) {
      if (this.$route.params.path === '/category/edit') {
        this.$router.back(-1)
      }
    } else {
      _id = this.$route.params.row.id
      _name = this.$route.params.row.name
      _parent = this.$route.params.row.parent
    }
    return {
      form: {
        id: _id,
        name: _name,
        parent: _parent
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
