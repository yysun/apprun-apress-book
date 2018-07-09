import app, { Component } from 'apprun';

class CounterComponent extends Component {
  state = 0;

  view = (state) => <div>
    <h1>{state}</h1>
    <button onclick={() => this.run("-1")}>-1</button>
    <button onclick={() => this.run("+1")}>+1</button>
  </div>;

  update = {
    '+1': (state) => state + 1,
    '-1': (state) => state - 1
  };
}
app.on('debug', p => console.log(p))
app.webComponent('my-app', CounterComponent)