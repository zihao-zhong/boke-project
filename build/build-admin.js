var shell = require('shelljs');

shell.cd('admin');
shell.echo('安装依赖包');
shell.exec('npm install');
shell.echo('开始打包项目');
shell.exec('npm run build');
shell.echo('项目打包完毕');

shell.echo('替换 Nginx 的旧项目');
shell.exec('rm -rf /usr/local/var/www/html/*');
shell.exec('mv ./dist/* /usr/local/var/www/html');
shell.echo('重启 Nginx');
shell.exec('nginx -s reload');
shell.echo('打包重启完成');
shell.exit();
