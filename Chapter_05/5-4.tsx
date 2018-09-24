import app, { Component } from 'apprun';

class ClockComponent extends Component {
  state = new Date();
  view = state => <h1>{state.toLocaleTimeString()}</h1>;
  update = {
    '#tick': state => new Date()
  };
}

window.setInterval(() => { app.run('#tick') }, 1000);
new ClockComponent().start('my-app');
