import app, {Component} from 'apprun';
import _ from './l10n';

export default class AboutComponent extends Component {
  state = 'About';

  view = (state) => {
    return <div>
      <h1>{_(state)}</h1>
    </div>
  }

  update = {
    '#About': state => state,
  }
}

