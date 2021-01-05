<template>
  <main class="ad-article-create">
    <h1 class="ad-article__title">{{id ? '修改' : '新增'}}文章</h1>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item prop="category" label="文章分类">
        <el-select v-model="form.category">
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="image" label="文章图片">
        <upload-image :url.sync="form.image" required></upload-image>
      </el-form-item>
      <el-form-item prop="title" label="文章标题" style="width: 600px;">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="文章描述" style="width: 600px;">
        <el-input v-model="form.description" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item prop="body" label="文章内容">
        <mavon-editor 
          ref="md" 
          :tabSize="2"
          :ishljs="true"
          v-model="form.content" 
          @imgAdd="handleImageAdd"
          style="min-height: 600px"
          @change="(val, html) => form.body = html" 
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>

import { uploadFile } from '@api/index'
import { getCategoryList } from '@api/category'
import { createArticle, getArticleDetail, articleUpdate } from '@api/article'

export default {
  name: 'ArticleCreate',

  props: {
    id: { 
      type: [String, Number]
    }
  },

  data() {
    return {
      options: [],
      form: {
        category: '',
        title: '',
        description: '',
        image: '',
        body: '',
        content: '',
      },
      rules: {
        category: { required: true, message: '请输入' },
        title: { required: true, message: '请输入' },
        description: { required: true, message: '请输入' },
        image: { required: true, message: '请输入' },
        body: { required: true, message: '请输入' },
      },
    }
  },

  methods: {
    handleSubmit() {
      this.checkForm('form').then(  async () => {
        const res = this.id
          ? await articleUpdate(this.id)
          : await createArticle(this.form)

        this.$message.success(res.message)
      })
    },
    async handleImageAdd(pos, file) {
      try {
        const formdata = new FormData()
        formdata.append('file', file)
        const data = await uploadFile(formdata)
        this.$refs.md.$img2Url(pos, data.url)
      } catch (error) {
        console.log( error )
      }
    },
    async getCategoryList() {
      this.options = await getCategoryList()
    },
    async getArticleDetail() {
      this.form = await getArticleDetail(this.id)
    }
  },

  created() {
    this.getCategoryList()

    if ( this.id ) {
      this.getArticleDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.ad-article-create {
  .ad-article__title {
    text-align: center;
    margin-bottom: 50px;
  }
}
</style>