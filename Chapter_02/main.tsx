import app from 'apprun';

const state = 'Hello World - AppRun'

const view = state => {
  return <div>
    {state}
  </div>
}

const update = {
  '#': (state) => state
}

app.start('my-app', state, view, update);
