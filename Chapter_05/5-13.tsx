import app, { Component } from 'apprun';

class HelloComponent extends Component {
  state = 'World';
  view = state => <div>
    <h1>Hello {state}</h1>
    <input onchange={e => this.run('input', e)} value={state} />
  </div>;

  update = {
    '#': (state, hash) => hash || state,
    'input': (_, e) => {
      const text = e.target.value;
      history.pushState(null, text, '#/' + text);
      return text;
    }
  };
}

app.render(document.getElementById('my-app'), <HelloComponent />);