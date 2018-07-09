import app, { Component } from 'apprun';
import serializeForm from './serializeForm';

class HelloComponent extends Component {

  state = 'World';

  view = (state) => <form onsubmit={e => this.run('submit', e)}>
    <h3>Hello {state}</h3>
    <input id="text"/>
    <button type="submit">Go</button>
  </form>;

  update = {
    'submit': (state, e) => {
      e.preventDefault();
      const json = serializeForm(document.forms[0]);
      return json['text'];
    }
  }
}

app.render(document.getElementById('my-app'), <HelloComponent />);