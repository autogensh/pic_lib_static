<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-input v-model="form.id" type="hidden" />
      <el-input v-model="form.isDeleted" type="hidden" />
      <el-input v-model="form.updateAt" type="hidden" />
      <el-form-item label="协议标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="协议内容">
        <el-input
          v-model="form.content"
          :rows="15"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { editLicense, addLicense } from '@/api/license'

export default {
  data() {
    if (!this.$route.params.row) {
      if (this.$route.params.path === '/license/edit') {
        this.$router.back(-1)
      }
      return {
        form: {
          id: '',
          title: '',
          content: '',
          isDeleted: '',
          updateAt: ''
        }
      }
    }
    return {
      form: {
        id: this.$route.params.row.id,
        title: this.$route.params.row.title,
        content: this.$route.params.row.content,
        isDeleted: this.$route.params.row.isDeleted,
        updateAt: this.$route.params.row.updateAt
      }
    }
  },
  methods: {
    onSubmit(data) {
      if (this.$route.params.path === '/license/edit') {
        editLicense(data, (res) => {
          if (res.code === 20000) {
            this.$router.push({ name: '许可管理' })
          }
        })
      } else {
        addLicense(data, (res) => {
          if (res.code === 20000) {
            this.$router.push({ name: '许可管理' })
          }
        })
      }
    }
  }
}
</script>

