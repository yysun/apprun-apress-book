import app, { Component } from 'apprun';

class DelayedEchoComponent extends Component {

  state = 'World';

  view = (state) => <div>
    <h3>Hello {state}</h3>
    <input oninput={e => this.run("input", e)} />
  </div>;

  update = {
    'input': [(state, e) => e.target.value, {delay: 1000}]
  }
}

new DelayedEchoComponent().start('my-app');