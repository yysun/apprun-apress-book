import app from 'apprun';
import _, { setLanguage } from './l10n';

app.on('#', _ => app.run('#Home'))

app.on('//', route => {
  const menus = document.querySelectorAll('.navbar-nav li');
  for (let i = 0; i < menus.length; ++i) menus[i].classList.remove('active');
  const item = document.querySelector(`[href='${route}']`);
  item && item.parentElement.classList.add('active');
})

app.on('#language', (language, e) => {
  e && e.preventDefault()
  setLanguage(language);
  document.location.reload();
})

const view = state => <div className="container">
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">AppRun</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#Home">{_('Home')}
            <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#About">{_('About')}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#Contact">{_('Contact')}</a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="#" onclick={e=>app.run('#language','en', e)}>English</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onclick={e=>app.run('#language','fr', e)}>français</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onclick={e=>app.run('#language','zh', e)}>中文</a>
        </li>
      </ul>
    </div>
  </nav>
  <div className="container" id="my-app"></div>
</div>

app.start('main', {}, view, {})

import Home from './Home';
import About from './About';
import Contact from './Contact';

const element = 'my-app';
new Home().mount(element);
new About().mount(element);
new Contact().mount(element);