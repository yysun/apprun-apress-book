import app from 'apprun';

const state = new Date();
const view = state =>  <h1>{state.toLocaleTimeString()}</h1>;
const update = {
  'timer': state => new Date()
};
setInterval(() => { app.run('timer') }, 1000);
app.start('my-app', state, view, update);
