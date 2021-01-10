const shell = require('shelljs');

// shell.cat('/');
// shell.cat('');

// if (shell.cat('admin') === 'Is a directory') {
//   shell.echo('dir');
// } else {
//   shell.echo('file');
// }



// var version = shell.exec('node --version', { silent: true }).stdout;
// shell.echo(version);
shell.exec('node --version', function(code, stdout, stderr) {
  console.log( code, '-', stdout, '=', stderr );
});


// const url = shell.find('build', 'README.md');
// shell.echo(url);













