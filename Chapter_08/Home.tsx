import app, {Component} from 'apprun';
import _ from './l10n';
export default class HomeComponent extends Component {
  state = 'Home';

  view = (state) => {
    return <div>
      <h1>{_(state)}</h1>
    </div>
  }

  update = {
    '#Home': state => state,
  }
}

