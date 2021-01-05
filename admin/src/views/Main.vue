<template>
  <el-container class="ad-container">
    <el-header>
      <div class="ad-header-logo">
        BOKE
      </div>
      <div class="ad-header-container">
        <el-switch
          v-model="isCollapse"
          active-color="#13ce66"
          :active-value="false"
          :inactive-value="true"
        >
        </el-switch>
      </div>
      <el-dropdown class="ad-header-user">
        <i class="el-icon-setting" style="margin-right: 10px;"></i>
        <span>Admin</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside :width="!isCollapse ? '200px' : '80px'">
        <el-menu router unique-opened :default-active="$route.path" :collapse="isCollapse">
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/category/create">新建分类</el-menu-item>
              <el-menu-item index="/category/list">分类列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/article/create">新建文章</el-menu-item>
              <el-menu-item index="/article/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Main',

  data() {
    return {
      isCollapse: false
    }
  },

  methods: {
    logout() {
      localStorage.token = ''
      this.$router.push('/login')
      this.$message.success('退出成功')
    }
  }
}
</script>

<style lang="scss">
.ad-container {
  height: 100vh;
  overflow: hidden;
  .el-header {
    display: flex;
    padding: 0;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eaeefb;
    .ad-header-logo {
      width: 200px;
      height: 100%;
      font-size: 30px;
      font-weight: 700;
      line-height: 60px;
      text-align: center;
      color: #dbe4f0;
      border-right: 1px solid #eaeefb;
      text-shadow: 1px 1px white, -1px -1px 1px #000;
    }
    .ad-header-container {
      flex: 1;
      padding: 0 10px;
    }
    .ad-header-user {
      width: 200px;
      text-align: right;
      padding-right: 20px
    }
  }
  .el-container {
    .el-aside {
      overflow-y: auto;
      padding-bottom: 100px;
      & > .el-menu {
        height: 100vh;
        border-right: 1px solid #eaeefb;
      }
    }
    .el-main {
      height: calc(100vh - 60px);
      // height: 100vh;
      // padding-bottom: 100px;
    }
  }
}
</style>
