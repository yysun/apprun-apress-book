import app, { Component } from 'apprun';

class ClockComponent extends Component {
  state = new Date();
  view = state => <h1>{state.toLocaleTimeString()}</h1>;
  update = {
    'timer': state => new Date()
  };
  mounted = () => setInterval(() => { this.run('timer') }, 1000);
}

app.render(document.getElementById('my-app'), <ClockComponent />);
