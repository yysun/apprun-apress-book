import app from 'apprun';

const state = {}

const view = (state) => {
  return <div>
    {state}
  </div>
}

const update = {
  '#': (state) => state
}

app.start('my-app', state, view, update);