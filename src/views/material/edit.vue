<template>
  <div class="app-container">
    <el-form ref="form" v-loading="formLoading" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="素材分类" prop="catId">
        <el-select v-model="form.catId" clearable placeholder="选择一个素材分类">
          <el-option
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="素材名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="输入素材名称"
          maxlength="60"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="许可协议" prop="license">
        <el-select v-model="form.license" clearable placeholder="选择一个许可协议">
          <el-option
            v-for="(item, index) in licenseList"
            :key="index"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="素材描述" prop="desc">
        <el-input
          v-model="form.desc"
          :rows="8"
          maxlength="1000"
          placeholder="请输入内容"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="上传素材" prop="uploads">
        <el-upload
          :action="uploadAction"
          :before-upload="beforeUpload"
          :limit="limit"
          :on-change="onUploadChange"
          :on-error="onUploadError"
          :on-exceed="onExceed"
          :on-preview="onUploadPreview"
          :on-remove="onRemove"
          :on-success="onUploadSuccess"
          :show-file-list="true"
          list-type="picture-card"
          :file-list="uploaded"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img :src="dialogImageUrl" alt="" width="100%">
        </el-dialog>
        <span style="color:#888">* 暂时只支持上传{{ limit }}张素材</span>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-input
          v-model="form.tags"
          maxlength="60"
          show-word-limit
        />
        <span style="color:#888">* 请用小写逗号分隔, 否则会被看作同一个标签</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { updateMaterial, getMaterialFiles } from '@/api/material'
import { getCategoryList } from '@/api/category'
import { getLicenseList } from '@/api/license'

export default {
  data() {
    var _id = ''
    var _name = ''
    var _catId = ''
    var _desc = ''
    var _license = ''
    var _tags = ''
    if (this.$route.params.row) {
      _id = this.$route.params.row.id
      _catId = this.$route.params.row.catId
      _name = this.$route.params.row.materialName
      _desc = this.$route.params.row.desc
      _license = this.$route.params.row.licenseId
      _tags = this.$route.params.row.tags || ''
    }
    return {
      categoryList: null,
      licenseList: null,
      uploaded: [],
      step: 0,
      maxStep: 2,
      formLoading: false,
      uploadAction: process.env.VUE_APP_BASE_API + '/admin/material/upload',
      dialogImageUrl: '',
      dialogVisible: false,
      limit: 3,
      form: {
        id: _id,
        catId: _catId,
        name: _name,
        desc: _desc,
        license: _license,
        materialImgs: '',
        tags: _tags
      },
      rules: {
        catId: [{ required: true, message: '请选择一个素材分类', trigger: ['blur', 'change'] }],
        name: [{ required: true, message: '请输入素材名', trigger: 'blur' }],
        license: [{ required: true, message: '请选择一个许可协议', trigger: ['blur', 'change'] }]
      }
    }
  },
  created() {
    // edit的时候需要, add的时候不需要
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.formLoading = true
      if (this.$route.params.row) {
        this.maxStep = 3
        getMaterialFiles(this.form.id, response => {
          for (var i in response.items) {
            response.items[i].url = response.items[i].fileUrl
            response.items[i].name = response.items[i].id
            response.items[i].status = 'finished'
          }
          this.uploaded = response.items
          this.step += 1
          this.form.materialImgs = this.fileListToMaterialImgs(response.items)
          if (response.items.length >= this.limit) {
            this.hideUpload()
          } else {
            this.showUpload()
          }
          if (this.step >= this.maxStep) {
            this.formLoading = false
          }
        })
      } else {
        this.maxStep = 2
      }

      getCategoryList({}, response => {
        this.categoryList = response.items
        this.step += 1
        if (this.step >= this.maxStep) {
          this.formLoading = false
        }
      })
      getLicenseList({}, response => {
        this.licenseList = response.items
        this.step += 1
        if (this.step >= this.maxStep) {
          this.formLoading = false
        }
      })
    },
    hideUpload() {
      document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'none'
    },
    showUpload() {
      document.getElementsByClassName('el-upload--picture-card')[0].style.display = ''
    },
    onUploadChange(file, fileList) {
      if (fileList.length >= this.limit) {
        this.hideUpload()
      } else {
        this.showUpload()
      }
    },
    fileListToMaterialImgs(fileList) {
      var objs = []
      for (var i in fileList) {
        objs.push(fileList[i])
      }
      return JSON.stringify(objs)
    },
    onUploadSuccess(res, file, fileList) {
      var objs = []
      for (var i in fileList) {
        if (fileList[i].response != null) {
          objs.push(fileList[i].response.materialFile)
        } else {
          objs.push(fileList[i])
        }
      }
      this.form.materialImgs = this.fileListToMaterialImgs(objs)
    },
    onUploadError(err, file, fileList) {
      err = ''
      this.$message.error('上传失败，请等会儿再试试!')
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt100M = file.size / 1024 / 1024 <= 100

      if (isJPG || isPNG || isGIF) {
        if (isLt100M) {
          this.hideUpload()
          return true
        }
        this.$message.warning('上传文件大小不能超过 100MB!')
        return false
      }
      this.$message.warning('暂时只支持JPG/PNG/GIF格式的素材!')
      return false
    },
    onRemove(file, fileList) {
      var objs = []
      for (var i in fileList) {
        if (fileList[i].response != null) {
          objs.push(fileList[i].response.materialFile)
        } else {
          objs.push(fileList[i])
        }
      }
      this.form.materialImgs = this.fileListToMaterialImgs(objs)
      if (fileList.length < this.limit) {
        this.showUpload()
      }
    },
    onUploadPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onExceed(file, fileList) {
      if (fileList.length >= this.limit) {
        this.hideUpload()
      } else {
        this.showUpload()
      }
      this.$message.warning('最多只能上传' + this.limit + '张素材哦!')
    },
    onSubmit(data) {
      if (data.materialImgs === '') {
        data.materialImgs = '[]'
      }
      data.materialImgs = JSON.parse(data.materialImgs)
      updateMaterial(data, (res) => {
        if (res.code === 20000) {
          this.$router.push({ name: '素材管理' })
        } else {
          this.$message.error('上传失败，请稍后再试!')
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
