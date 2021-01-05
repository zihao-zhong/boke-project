<template>
  <main class="hc-login">
    <div class="hc-login-container">
      <h2 class="hc-login__title">登录</h2>
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="username" label="用户名：">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSubmit">登录</el-button>
          <u class="fr cursor">忘记密码?</u>
        </el-form-item>
      </el-form>
    </div>
  </main>
</template>

<script>
import { login } from '@api'
import cookie from 'js-cookie'
export default {
  name: 'Login',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: { required: true, message: '请输入用户名' },
        password: { required: true, message: '请输入密码' },
      },
    }
  },

  methods: {
    handleSubmit() {
      this.checkForm('form').then(async () => {
        const data = await login(this.form)
        this.$message.success(data.message)
        cookie.set('token', data.token)
        this.$router.push('/')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.hc-login {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('../assets/images/login.jpg') no-repeat top center;
  background-size: cover;
  .hc-login-container {
    position: fixed;
    left: 100px;
    top: 100px;
    width: 300px;
    padding: 0 15px;
    border-radius: 8px;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0,0,0,.7);
    // background-color: rgba(255,255,255, 1);
    .hc-login__title {
      line-height: 60px;
      text-align: center;
    }
  }
}
</style>