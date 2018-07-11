import app, {Component} from 'apprun';

export class About extends Component {
  state = '';

  view = (state) => {
    return <div>
      About  - {state}
    </div>
  }

  update = {
    '/about': _ => {
      throw new Error('test');
      // return new Date().toLocaleTimeString()
    }
  }
}

export default new About().mount();