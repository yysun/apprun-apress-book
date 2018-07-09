declare var app: typeof import("apprun").app;
declare var Component: typeof import("apprun").Component;

export default class extends Component {
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

