import app from 'apprun';

const STORAGE_KEY = 'to-do-list';

//#region state
type TodoItem = {
  title: string;
  done: boolean;
}

type State = {
  filter: 'All' | 'Active' | 'Complete',
  list: Array<TodoItem>
};

const state: State = {
  filter: 'All',
  list: []
};
//#endregion

//#region stateless components

function pluralize(number, label) {
  if (!number) number = 0;
  return (number === 1) ? number + label : number + label + 's'
}

const Header = () => <header className="header">
  <h1>todos</h1>
  <input className="new-todo" placeholder="What needs to be done?" autofocus
    onkeyup={e => app.run('keyup', e)} />
</header>


const Footer = () => {
  return <footer className="info">
    <p>Double-click to edit a todo</p>
    <p>Created using <a href="https://github.com/yysun/apprun">AppRun</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
}

const Todo = ({ todo, idx }) => <li className={todo.done ? "completed" : "view"}>
  <div className="view">
    <input className="toggle" type="checkbox" checked={todo.done}
      onclick={() => app.run('toggle-item', idx)}/>
    <label>{todo.title}</label>
    <button className="destroy" onclick={() => app.run('delete-item', idx)}></button>
  </div>
  <input className="edit" value={todo.title} />
</li>

const Main = ({ state }) => {
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
          .map((todo, idx) => <Todo todo={todo} idx={idx} />)
      } </ul>
    </section>
    <footer className="footer">
      <span className="todo-count">{`${pluralize(countActive, ' item')} left`}</span>
      <ul className="filters">
        <li><a href='#' className={state.filter === 'All' ? 'selected' : ''} onclick={e => app.run('filter-item', e)}>All</a></li>
        <li><a href='#' className={state.filter === 'Active' ? 'selected' : ''} onclick={e => app.run('filter-item', e)}>Active</a></li>
        <li><a href='#' className={state.filter === 'Complete' ? 'selected' : ''} onclick={e => app.run('filter-item', e)}>Complete</a></li>
      </ul>
      {countComplete > 0 ? <button className="clear-completed"
        onclick={e => app.run('clear-completed')}>Clear completed</button> : ''}
    </footer>
  </>
}

//#endregion

const view = (state: State) => <>
  <section className="todoapp">
    <Header />
    <Main state={state} />
  </section>
  <Footer />
</>;


const update = {
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
      app.run('add-item', e.target.value);
      e.target.value = '';
    }
  },
  'clear-completed': state => ({
    ...state,
    list: state.list.filter(todo=>!todo.done)
  })
};

const rendered = state => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const stored = localStorage.getItem(STORAGE_KEY)
app.start('my-app', stored ? JSON.parse(stored) : state,
  view, update, { history: true, rendered });