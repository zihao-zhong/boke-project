# 个人的博客代码库
> 分为三个项目，后端Node项目，后台管理页面，前台展示项目

## 后台使用 vue-cli 生成，使用 element-ui 作为 ui 框架

### 数据库使用 mongoDB 

### 后端使用 express 框架

### 部署到本地的 nginx

```
npm run build-admin
```

### 使用 pm2 启动 node 服务

> pm2 一般用于服务器部署 node 服务，本地还是使用 nodemon 或者 vscode 启动 node 服务。pm2 无法实现热更新

```
/Users/luke/Documents/project/boke-project/server
pm2 start index.js
```


