import app from 'apprun';

const STORAGE_KEY = 'to-do-list';
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

const view = (state: State) => {
  const n1 = state.list.length;
  const n2 = state.list.filter(todo => !todo.done).length || 0;
  const n3 = state.list.filter(todo => todo.done).length || 0;
  console.log(state)
  return <div>
    <button onclick={() => app.run("history-prev")}> &lt;&lt; </button>
    <button onclick={() => app.run("history-next")}> &gt;&gt; </button>
    <p><input onkeyup={e => app.run('keyup', e)} /></p>
    <ul>
      {
        state.list
          .filter(todo => state.filter === 'All' ||
            (state.filter === 'Active' && !todo.done) ||
            (state.filter === 'Complete' && todo.done))
          .map((todo, idx) => <li>
            <input type='checkbox' onclick={() => app.run('toggle-item', idx)} />
            <span>{todo.title} {' '}
              (<a href='#' onclick={() => app.run('delete-item', idx)}>&#9249;</a>)
              </span>
          </li>)
      }
    </ul>
    <div>
      <a href='#' onclick={e => app.run('filter-item', e)}>All</a> {` (${n1}) | `}
      <a href='#' onclick={e => app.run('filter-item', e)}>Active</a> {`(${n2}) | `}
      <a href='#' onclick={e => app.run('filter-item', e)}>Complete</a> {`(${n3})`}
    </div>
  </div>
};

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
  }
};

const rendered = state => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const stored = localStorage.getItem(STORAGE_KEY)
app.start('my-app', stored ? JSON.parse(stored) : state,
  view, update, { history: true, rendered });