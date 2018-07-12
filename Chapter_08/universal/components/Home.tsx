import app, {Component} from 'apprun';

export default class extends Component {
  state = ''

  view = (state) => <div>
    Home - {state}
  </div>;

  update = {
    'home': _ => new Date().toLocaleTimeString()
  }
}