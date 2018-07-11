import app, {Component} from 'apprun';

export class Contact extends Component {
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

export default new Contact().mount();

