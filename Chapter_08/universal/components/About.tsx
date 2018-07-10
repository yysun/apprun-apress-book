import app, {Component} from 'apprun';

export default class extends Component {
  state = 'About';

  view = (state) => {
    return <div>
      {state} - {new Date().toLocaleTimeString()}
    </div>
  }

  update = {
    '/about': state => {
      throw new Error('test')
    }
  }
}
