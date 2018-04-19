import app, { Component } from 'apprun';

export const styles = `
  .typeahead ul {
    position: absolute;
    background-color: white;
    width: 200px;
    list-style-type: none;
    list-style-position: inside;
    margin: 0;
    padding: 0;
  }
  .typeahead li.selected, .typeahead li:hover {
    background-color: #ffff99;
  }
`
export default class TypeAheadComponent extends Component {

  state = {
    show: false,
    selected: '',
    options: []
  }

  Options = ({ state }) => <ul>{state.options.map(option =>
    <li className={(option === state.selected) ? 'selected' : ''}
      onclick={() => this.run('select', option)}>{option}
    </li>)
  }
  </ul>

  view = (state) => {
    return <div className='typeahead'>
      <input type="text" placeholder=" Search:" autocomplete="off"
        value={state.selected}
        oninput={e => this.run('search', e)}
        onkeydown={e => this.run(`keydown`, e)} />
      {state.show && state.options.length ? <this.Options state={state} /> : ''}
    </div>
  }

  update = {
    'search': async (state, e) => {
      const options = await this.props.onSearch(e.target.value);
      return {
        ...state,
        show: true,
        selected: e.target.value,
        options
      }
    },
    'popup': (state, show) => state.show === show ? null : { ...state, show },
    'keydown': (state, e) => {
      let selectedIdx = state.options.indexOf(state.selected);
      switch (e.keyCode) {
        case 27:
          return ({ ...state, show: false });
        case 38:
          selectedIdx--;
          if (selectedIdx < 0) selectedIdx = 0;
          return ({ ...state, selected: state.options[selectedIdx] });
        case 40:
          selectedIdx++;
          if (selectedIdx >= state.options.length) selectedIdx = state.options.length - 1;
          return ({ ...state, selected: state.options[selectedIdx] });
        case 13:
          e.preventDefault();
          this.run('select', state.selected);
      }
    },
    'select': (state, selected) => {
      this.props.onSelect(selected);
      return ({ ...state, selected, show: false });
    }
  }

  constructor(protected props) {
    super();
    document.addEventListener('click', () => { this.run('popup', false) });
  }
}
