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
  console.log(apprun)
  const path = `${req.path}/${Date.now()}`;
  apprun.on('debug', p => {
    if (p.vdom && p.state.path === path.substring(2)) resolve(p.vdom);
  });
  setTimeout(() => { reject('Timeout') }, 10000);
  try {
    apprun.run('route', path);
  } catch (ex) {
    reject(ex.message);
  }
});

app.get('*', async (req, res) => {
  const ssr = req.headers.accept.indexOf('application/json') < 0;
  try {
    const vdom = await route(req);
    res.render('layout', { ssr, vdom });
  } catch (ex) {
    res.render('layout', { ssr, vdom: ex.message || ex });
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});