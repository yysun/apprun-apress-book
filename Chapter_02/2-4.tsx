import app, { View, Update } from 'apprun';

const state: string = 'Hello World - AppRun'

const view: View<typeof state> = state => {
  return <div>
    {state}
  </div>
}

const update: Update<typeof state> = {
  '#': (state) => state
}






app.start('my-app', state, view, update);
