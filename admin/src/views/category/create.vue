<template>
  <main class="ad-category-create">
    <h1 class="ad-category__title">新增分类</h1>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item prop="name" label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
import { createCategory } from '@api/category'
export default {
  name: 'CategoryCreate',

  data() {
    return {
      form: {
        name: ''
      },
      rules: {
        name: { required: true, message: '请输入分类名称' }
      }
    }
  },

  methods: {
    handleSubmit() {
      this.checkForm('form').then( async () => {
        const res = await createCategory(this.form)
        this.$message.success(res.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ad-category-create {
  width: 500px;
  .ad-category__title {
    text-align: center;
    margin-bottom: 50px;
  }
}
</style>