const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const inquirer = require('inquirer');

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('Automated Build', {
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: 'branch',
      type: 'input',
      default: 'master',
      message: '你想构建什么分支?'
    },
  ];
  return inquirer.prompt(questions);
};

function checkBranch(branch) {
  if (shell.exec(`git checkout ${branch}`, { silent: true }).code !== 0) {
    if (shell.exec(`git checkout -b ${branch} origin/${branch}`, { silent: true }).code !== 0) {
      console.log(chalk.red('Error: 找不到该分支，请确认分支是否填写正确'));
      shell.exit(1);
    }
  }
  shell.echo(chalk.green(`已切换到 ${branch} 分支`));
}

function handleBuild() {
  shell.cd('admin');
  shell.echo(chalk.green('安装依赖包'));
  shell.exec('npm install');
  shell.echo(chalk.green('开始打包项目'));
  shell.exec('npm run build');
  shell.echo(chalk.green('项目打包完毕'));

  shell.echo(chalk.green('替换 Nginx 的旧项目'));
  shell.exec('rm -rf /usr/local/var/www/html/*');
  shell.exec('mv ./dist/* /usr/local/var/www/html');
  shell.echo(chalk.green('重启 Nginx'));
  shell.exec('nginx -s reload');
  shell.echo(chalk.green('Nginx 重启完成'));
  shell.exit();
}

(async () => {
  init();
  const { branch } = await askQuestions();
  checkBranch(branch);
  handleBuild();
})();