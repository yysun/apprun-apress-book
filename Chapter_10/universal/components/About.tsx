import app, {Component} from 'apprun';

export default class extends Component {
  state = '';

  view = (state) => {
    return <div>
      About  - {state}
    </div>
  }

  update = {
    '/about': _ => {
      throw new Error('test');
    }
  }
}