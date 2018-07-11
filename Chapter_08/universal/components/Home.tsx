import app, {Component} from 'apprun';

export class Home extends Component {
  state = ''

  view = (state) => {
    const html = <div>
      Home - {state}
    </div>;
    return state.cb ? state.cb(html) : html;
  }

  update = {
    '/home': (_, cb) => ({ time: new Date().toLocaleTimeString(), cb })
  }
}

export default new Home().mount();