import app, { View, Update } from 'apprun';

const state: string = 'Hello world!';

const view: View<typeof state> = state => <div>
  <h1>{state}</h1>
</div>;

const update: Update<typeof state> = {

}


app.start<typeof state>('my-app', state, view, update);
