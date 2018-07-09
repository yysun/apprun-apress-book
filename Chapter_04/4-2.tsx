import app from 'apprun';
const state = {};

const Header = () => <header className="header"></header>;

const Footer = () => <footer className="info"></footer>;

const Todo = ({ todo, idx }) => <li className="completed"></li>;

const Main = ({ state }) => <>
  <section className="main">
    <ul className="todo-list"> {
      state.list.map((todo, idx) => <Todo todo={todo} idx={idx} />)
    } </ul>
  </section>
  <footer className="footer"></footer>
</>;

const view = (state) => <>
  <section className="todoapp">
    <Header />
    <Main state={state} />
  </section>
  <Footer />
</>;
const update = {};
app.start(document.body, state, view, update, { history: true });
