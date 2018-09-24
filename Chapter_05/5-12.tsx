import app, { Component } from 'apprun';

class HelloComponent extends Component {
  state = 'World';
  view = state => <div>
    <h1>Hello {state}</h1>
    <input onchange={e => this.run('change', e)} value={state} />
  </div>;

  update = {
    '#': (state, hash) => hash || state,
    'change': (_, e) => {
      const text = e.target.value;
      history.pushState(null, text, '#/' + text);
    }
  };
}

new HelloComponent().start('my-app');