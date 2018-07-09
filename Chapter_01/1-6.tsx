import app, { View, Update } from 'apprun';

const state: number = 0;
type State = typeof state;

const view = (state: State) => <div>
  <h1>{state}</h1>
  <button onclick={() => app.run("-1")}>-1</button>
  <button onclick={() => app.run("+1")}>+1</button>
</div>;

const update: Update<State> = {
  '+1': (state) => state + 1,
  '-1': (state) => state - 1
};

app.start<State>('my-app', state, view, update);
