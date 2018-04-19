import app from 'apprun';

const state = 0;

const view = (state) => <div>
  <h1>{state}</h1>
  <button onclick={() => app.run("DECREASE")}>-1</button>
  <button onclick={() => app.run("INCREASE")}>+1</button>
</div>;

const update = {
  'INCREASE': (state) => state + 1,
  'DECREASE': (state) => state - 1
};

app.start('my-app', state, view, update);
