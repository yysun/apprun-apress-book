import app, {Component} from 'apprun';

export default class extends Component {
  state = '';

  view = (state) => {
    return <div>
      Contact - {state}
    </div>
  }

  update = {
    '/contact': _ => new Date().toLocaleTimeString()
  }
}

