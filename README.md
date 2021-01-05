# 个人的博客代码库
> 分为三个项目，后端Node项目，后台管理页面，前台展示项目

## 后台使用 vue-cli 生成，使用 element-ui 作为 ui 框架

### 部署到本地的 nginx

```
cd /Users/luke/Documents/project/boke-project/admin
npm run build   # 打包
rm -rf /usr/local/var/www/html/*     # 清空网站根目录下的所有文件
mv ./dist/* /usr/local/var/www/html  # 把打包好的文件添加到 nginx 的网站根目录
nginx -s reload   # 然后重启 nginx 服务
```
