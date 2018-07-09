import app, { Component } from 'apprun';

export default class MyComponent extends Component {
  state = {};

  view = (state) => <div>{state}</div>;

  update = {
    '#': (state) => state
  };

  mounted = (props) => { };

  rendered = (state) => { };
}