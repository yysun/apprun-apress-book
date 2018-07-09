import app from 'apprun';

const state = [];

const view = (state) => <div>
  <div>
    <button onclick={() => app.run("history-prev")}> &lt;&lt; </button>
    <button onclick={() => app.run("history-next")}> &gt;&gt; </button>
    <button onclick={() => app.run("add-counter")}>add counter</button>
    <button onclick={() => app.run("remove-counter")} disabled={state.length <= 0}>remove counter</button>
  </div>
  {state.map((num, idx) => <div>
    <h1>{num}</h1>
    <button onclick={() => app.run("update-counter", idx, -1)}>-1</button>
    <button onclick={() => app.run("update-counter", idx, 1)}>+1</button>
    <button onclick={() => app.run("remove-counter", idx)}>x</button>
  </div>
  )}
</div>

const update = {
  'add-counter': (state) => [...state, 0],
  'remove-counter': (state, idx = state.length - 1) => [
    ...state.slice(0, idx),
    ...state.slice(idx + 1)
  ],
  'update-counter': (state, idx, delta) => [
    ...state.slice(0, idx),
    state[idx] + delta,
    ...state.slice(idx + 1)
  ]
};

app.start('my-app', state, view, update, {history: true});