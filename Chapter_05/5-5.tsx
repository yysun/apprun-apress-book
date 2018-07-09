import app, { Component } from 'apprun';

class HelloComponent extends Component {

  state = 'World';

  view = (state) => <div>
    <h3>Hello {state}</h3>
    <input id="text"/>
    <button onclick={() => this.run("input")}>Go</button>
  </div>;

  update = {
    'input': (state) => document.getElementById('text')['value']
  }
}

app.render(document.getElementById('my-app'), <HelloComponent />);