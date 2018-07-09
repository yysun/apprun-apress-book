import app, { View, Update } from 'apprun';

const state = {};
type State = typeof state;

const view = (state: State) => <div>{state}</div>;

const update: Update<State> = {};

app.start<State>('my-app', state, view, update);
