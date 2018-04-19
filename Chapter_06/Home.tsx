import app, {Component} from 'apprun';

export default class MyComponent extends Component {
  state = 'Home';

  view = (state) => {
    return <div>
      <h1>{state}</h1>
    </div>
  }

  update = {
    '#Home': state => state,
  }
}

new MyComponent().start('my-app');
