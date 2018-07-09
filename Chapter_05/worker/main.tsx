import app, { Component } from 'apprun';

const worker = new Worker("worker.js") as any;
worker.onmessage = e => {
  const { name, parameters } = JSON.parse(e.data);
  app.run(name, ...parameters);
}

worker.run = (name, ...parameters) =>
  worker.postMessage(JSON.stringify({ name, parameters }));

class CounterComponent extends Component {

  state = 0;

  view = (state) => <div>
    <h1>{state}</h1>
    <button onclick={() => worker.run("-1", state)}>-1</button>
    <button onclick={() => worker.run("+1", state)}>+1</button>
  </div>;

  update = {
    '#': (state, val) => val
  }
}

app.render(document.getElementById('my-app'), <CounterComponent />);

