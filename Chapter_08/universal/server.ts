import * as viewEngine from 'apprun/viewEngine';
import * as express from 'express';
const app = express();

app.use(express.static('public'));

// set apprun as view engine
app.engine('js', viewEngine());
app.set('view engine', 'js');
app.set('views', __dirname + '/components');

const route = async (component, req, res) => {
  const getVdom = () => new Promise((resolve, reject) => {
    let vdom = false;
    const path = req.path === '/' ? '/home' : req.path;
    setTimeout(() => !vdom && reject(new Error('Cannot route:' + [path])), 300);
    component.run(path, html => resolve(vdom = html));
  });
  const ssr = req.headers.accept.indexOf('application/json') < 0;
  try {
    const vdom = await getVdom();
    res.render('layout', { ssr, vdom });
  } catch (ex) {
    console.log(ex);
    res.render('layout', { ssr, vdom: { Error: ex.message || ex } });
  }
}

import home from './components/Home';
import about from './components/About';
import contact from './components/Contact';
import { rejects } from 'assert';

app.get(/^\/(home)?$/, async (req, res) => {
  route(home, req, res);
});

app.get('/about', async (req, res) => {
  route(about, req, res);
});

app.get('/contact', async (req, res) => {
  route(contact, req, res);
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});