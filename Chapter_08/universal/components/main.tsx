import app, { Component } from 'apprun';

import Home from './Home';
import About from './About';
import Contact from './Contact';

const state = {};

const Route = ({ path }, children) => {
  const child = children.find(ch => ch.props.id === path);
  return child || children;
}

const view = (state) => {
  const vdom = <Route path={state.path}>
    <Home id="/home" />
    <About id="/about" />
    <Contact id="/contact" />
  </Route>;
  return state.cb ? state.cb(vdom) : vdom;
}

const update = {
  '#': (_, path, cb) => ({ path, cb })
}

export default app.start('', state, view, update);
