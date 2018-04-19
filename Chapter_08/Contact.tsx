import app, { Component } from 'apprun';
import _ from './l10n';

export default class ContactComponent extends Component {
  state = 'Contact';

  view = (state) => {
    return <div>
      <h1>{_(state)}</h1>
    </div>
  }

  update = {
    '#Contact': state => state,
  }
}
