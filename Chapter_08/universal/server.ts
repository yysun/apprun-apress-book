import apprun from 'apprun';
import * as viewEngine from 'apprun/viewEngine';

import * as express from 'express';
const app = express();

app.use(express.static('public'));

// set apprun as view engine
app.engine('js', viewEngine());
app.set('view engine', 'js');
app.set('views', __dirname + '/components');

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
new Home().mount();
new About().mount();
new Contact().mount();

const route = async (req) => new Promise((resolve, reject) => {
  setTimeout(() => reject('Cannot route: ' + req.path), 200);
  const waitForVdom = p => {
    if (p.vdom && p.state.path === req.path) {
      resolve(p.vdom);
    }
  };
  apprun.on('debug', waitForVdom);
  try {
    apprun.run('route', req.path);
  } catch (ex) {
    reject(ex.toString());
  }
  apprun.off('debug', waitForVdom);
});

app.get('*', async (req, res) => {
  const ssr = req.headers.accept.indexOf('application/json') < 0;
  try {
    const vdom = await route(req);
    res.render('layout', { ssr, vdom });
  } catch (error) {
    res.render('layout', { ssr, vdom: { error } });
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});