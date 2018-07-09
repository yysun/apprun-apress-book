import app, { Component } from 'apprun';
import Fab from './fab';

class FabApp extends Component {
  state = 0;

  view = (state) => <div>
    <h3>Clicked: {state}</h3>
    <Fab id='fab' onClick={text => this.run('action')} position={{x: 500, y:300}}/>
  </div>;

  update = {
    'action': state => state + 1
  }
}

app.render(document.getElementById('my-app'), <FabApp />);