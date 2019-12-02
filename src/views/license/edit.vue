<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-input v-model="form.id" type="hidden" />
      <el-input v-model="form.isDeleted" type="hidden" />
      <el-input v-model="form.updateAt" type="hidden" />
      <el-form-item label="协议标题" prop="title">
        <el-input
          v-model="form.title"
          maxlength="64"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="协议内容" prop="content">
        <el-input
          v-model="form.content"
          :rows="15"
          type="textarea"
          placeholder="请输入内容"
          maxlength="16777215"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { updateLicense } from '@/api/license'

export default {
  data() {
    var _id = ''
    var _title = ''
    var _content = ''
    var _createBy = ''
    if (!this.$route.params.row) {
      if (this.$route.params.path === '/license/edit') {
        this.$router.back(-1)
      }
    } else {
      _id = this.$route.params.row.id
      _title = this.$route.params.row.title
      _content = this.$route.params.row.content
      _createBy = this.$route.params.row.createBy
    }
    return {
      form: {
        id: _id,
        title: _title,
        content: _content,
        createBy: _createBy
      },
      rules: {
        title: [{ required: true, message: '请输入协议标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入协议内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit(data) {
      updateLicense(data, (res) => {
        if (res.code === 20000) {
          this.$router.push({ name: '许可管理' })
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

