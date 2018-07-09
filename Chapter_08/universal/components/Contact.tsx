import app, {Component} from 'apprun';

export default class extends Component {
  state = 'Contact';

  view = (state) => {
    return <div>
      {state} - {new Date().toLocaleTimeString()}
    </div>
  }

  update = {
    '/contact': state => state,
  }
}

