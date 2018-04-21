
const {spawn} = require('child_process');

const isHeroku = process.env.HEROKU;

if (isHeroku) {
  const child = spawn('yarn', ['build']);
  child.on('exit', () => console.log('Finished.'));
}
