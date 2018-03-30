
const {spawn} = require('child_process');

const isHeroku = process.env.HEROKU;

if (isHeroku) {
  const child = spawn('yarn.cmd', ['build']);
  child.on('exit', () => console.log('Finished.'));
}
