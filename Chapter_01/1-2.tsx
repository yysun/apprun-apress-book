import app, { Component } from 'apprun';
export default class MyComponent extends Component {
  state = {};
  view = (state) => <div>{state}</div>
  update = {
    '#Home': state => state,
  }
}
new MyComponent().start('my-app');

