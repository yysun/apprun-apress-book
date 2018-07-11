import apprun from 'apprun';
import * as viewEngine from 'apprun/viewEngine';
import * as express from 'express';
const app = express();

app.use(express.static('public'));

// set apprun as view engine
app.engine('js', viewEngine());
app.set('view engine', 'js');
app.set('views', __dirname + '/components');

const route = async (component, req, res) => {
  const getVdom = () => new Promise(resolve => {
    const path = req.path === '/' ? '/home' : req.path;
    apprun.run('route', path);
    component.run('#', path, html => resolve(html));
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

import main from './components/main';
app.get(/^\/(home|about|contact)?$/, async (req, res) => {
  route(main, req, res);
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});