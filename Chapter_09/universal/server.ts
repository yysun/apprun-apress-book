import * as viewEngine from 'apprun/viewEngine';
import * as express from 'express';
const app = express();

app.use(express.static('public'));

// set apprun as view engine
app.engine('js', viewEngine());
app.set('view engine', 'js');
app.set('views', __dirname + '/components');

const route = async (Component, req, res) => {
  const ssr = req.headers.accept.indexOf('application/json') < 0;
  const getState = (component) => new Promise((resolve, reject) => {
    const state = component.state;
    if (state instanceof Promise)
      state.then(s => resolve(s))
        .catch(r => reject(r));
    else
      resolve(state);
  });
  const component = new Component();
  try {
    const event = (req.path === '/' ? '/home' : req.path);
    component.mount();
    component.run(event);
    const state = await getState(component);
    const vdom = component.view(state);
    res.render('layout', { ssr, vdom });
  } catch (ex) {
    console.log(ex);
    res.render('layout', { ssr, vdom: { Error: ex.message || ex } });
  } finally {
    component.unmount();
  }
}

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

app.get(/^\/(home)?$/, async (req, res) => {
  route(Home, req, res);
});

app.get('/about', async (req, res) => {
  route(About, req, res);
});

app.get('/contact', async (req, res) => {
  route(Contact, req, res);
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});