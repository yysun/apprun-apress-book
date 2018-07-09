import app, { Component } from 'apprun';
export default class TypeAheadComponent extends Component {
  view = state => {
    return (
      <div className="typeahead">
        <input
          type="text"
          placeholder=" Search:"
          autocomplete="off"
          value={state.selected || ''}
          oninput={e => this.run('search', e)}
          onkeydown={e => this.run(`keydown`, e)}
        />
        <ul>{state.show && state.options.length ?
          state.options.map(option => (
            <li className={option === state.selected ? 'selected' : ''} onclick={() => this.run('select', option)}>
              {option}
            </li>
          )) : ''}</ul>
      </div>
    );
  };

  update = {
    search: async (state, e) => {
      const options = await this.state.onSearch(e.target.value);
      return {
        ...state,
        show: true,
        selected: e.target.value,
        options
      };
    },
    popup: (state, show) => (state.show === show ? null : { ...state, show }),
    keydown: (state, e) => {
      if (!state.options) return;
      let selectedIdx = state.options.indexOf(state.selected);
      switch (e.keyCode) {
        case 27:
          return { ...state, show: false };
        case 38:
          selectedIdx--;
          if (selectedIdx < 0) selectedIdx = 0;
          return { ...state, selected: state.options[selectedIdx] };
        case 40:
          selectedIdx++;
          if (selectedIdx >= state.options.length) selectedIdx = state.options.length - 1;
          return { ...state, selected: state.options[selectedIdx] };
        case 13:
          e.preventDefault();
          this.run('select', state.selected);
      }
    },
    select: (state, selected) => {
      this.state.onSelect(selected);
      return { ...state, selected, show: false };
    }
  };
}
