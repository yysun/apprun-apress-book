import app from 'apprun';

import Home from './Home';
import About from './About';
import Contact from './Contact';

declare var global;

export default class {
  constructor() {
    delete global['app'];
    new Home().mount();
    new About().mount();
    new Contact().mount(null, {history});
  }



  async route(req) {

    return new Promise((resolve, reject) => {

      // new Contact().mount(null, { history: (html) => resolve(html) });

      console.log(app)
      const path = `${req.path}/${Date.now()}`;
      app.on('debug', p => {
        if (p.vdom && p.state.path === path.substring(2)) resolve(p.vdom);
      });
      setTimeout(() => { reject('Timeout') }, 10000);
      try {
        app.run('route', path);
      } catch (ex) {
        reject(ex.message);
      }
    });
  }
}
