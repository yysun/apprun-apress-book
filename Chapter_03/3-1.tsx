import app from 'apprun';

const state = 0;

const view = (state) => <div>
  <h1>{state}</h1>
  <button onclick={() => app.run("-1")}>-1</button>
  <button onclick={() => app.run("+1")}>+1</button>
</div>;

const update = {
  '+1': (state) => state + 1,
  '-1': (state) => state - 1
};

app.start('my-app', state, view, update);
