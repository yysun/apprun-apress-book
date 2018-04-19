import app, { View, Update } from 'apprun';

const state: number = 0;
type State = typeof state;

const view = (state: State) => <div>
  <h1>{state}</h1>
  <button onclick={() => app.run("DECREASE")}>-1</button>
  <button onclick={() => app.run("INCREASE")}>+1</button>
</div>;

const update: Update<State> = {
  'INCREASE': (state) => state + 1,
  'DECREASE': (state) => state - 1
};

app.start<State>('my-app', state, view, update);
