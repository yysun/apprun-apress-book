import app, { Component } from 'apprun';

//#region state
const STORAGE_KEY = 'to-do-list-';
type TodoItem = {
  title: string;
  done: boolean;
}

type State = {
  filter: 'All' | 'Active' | 'Complete',
  list: Array<TodoItem>,
  type: 'my' | 'team';
  title: string;
};

//#endregion

function pluralize(number, label) {
  if (!number) number = 0;
  return (number === 1) ? number + label : number + label + 's'
}


export default class TodoComponent extends Component {

  state: State = {
    filter: 'All',
    list: [],
    type: "my",
    title: "my todos"
  };

  //#region stateless components

  Header = ({ title }) => <header className="header">
    <h1>{title}</h1>
    <input className="new-todo" placeholder="What needs to be done?" autofocus
      onkeyup={e => this.run('keyup', e)} />
  </header>;

  Footer = () => <footer className="info">
    <p>Double-click to edit a todo</p>
    <p>Created using <a href="https://github.com/yysun/apprun">AppRun</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>;


  Todo = ({ todo, idx }) => <li className={todo.done ? "completed" : "view"}>
    <div className="view">
      <input className="toggle" type="checkbox" checked={todo.done}
        onclick={() => this.run('toggle-item', idx)} />
      <label>{todo.title}</label>
      <button className="destroy" onclick={() => this.run('delete-item', idx)}></button>
    </div>
    <input className="edit" value={todo.title} />
  </li>;

  Main = ({ state }) => {
    const countAll = state.list.length;
    const countActive = state.list.filter(todo => !todo.done).length || 0;
    const countComplete = state.list.filter(todo => todo.done).length || 0;
    return <>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul className="todo-list"> {
          state.list
            .filter(todo => state.filter === 'All' ||
              (state.filter === 'Active' && !todo.done) ||
              (state.filter === 'Complete' && todo.done))
            .map((todo, idx) => <this.Todo todo={todo} idx={idx} />)
        } </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">{`${pluralize(countActive, ' item')} left`}</span>
        <ul className="filters">
          <li><a href='#' className={state.filter === 'All' ? 'selected' : ''} onclick={e => this.run('filter-item', e)}>All</a></li>
          <li><a href='#' className={state.filter === 'Active' ? 'selected' : ''} onclick={e => this.run('filter-item', e)}>Active</a></li>
          <li><a href='#' className={state.filter === 'Complete' ? 'selected' : ''} onclick={e => this.run('filter-item', e)}>Complete</a></li>
        </ul>
        {countComplete > 0 ? <button className="clear-completed"
          onclick={e => this.run('clear-completed')}>Clear completed</button> : ''}
      </footer>
    </>
  };

  view = (state: State) => <>
    <section className="todoapp">
      <this.Header title={state.title}/>
      <this.Main state={state} />
    </section>
    <this.Footer />
  </>;

  update = {
    'add-item': (state, title) => ({
      ...state,
      list: [...state.list, { title, done: false }]
    }),
    'delete-item': (state, idx) => ({
      ...state,
      list: [
        ...state.list.slice(0, idx),
        ...state.list.slice(idx + 1)
      ]
    }),
    'toggle-item': (state, idx) => ({
      ...state,
      list: [
        ...state.list.slice(0, idx),
        { ...state.list[idx], done: !state.list[idx].done },
        ...state.list.slice(idx + 1)
      ]
    }),
    'filter-item': (state, e) => ({ ...state, filter: e.target.textContent }),
    'keyup': (state, e) => {
      if (e.keyCode === 13) {
        this.run('add-item', e.target.value);
        e.target.value = '';
      }
    },
    'clear-completed': state => ({
      ...state,
      list: state.list.filter(todo => !todo.done)
    })
  };

  constructor(props) {
    super();
    const storageKey = STORAGE_KEY + props['type'];
    const stored = localStorage.getItem(storageKey);
    this.state = stored ? JSON.parse(stored) : { ...this.state, ...props, storageKey };
  }
  rendered = state => localStorage.setItem(this.state['storageKey'], JSON.stringify(state));

}