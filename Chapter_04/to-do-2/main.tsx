import app from 'apprun';
import TodoComponent from './to-do-component';

const view = state => <div className="main">
  <TodoComponent type="my" title="my todos" />
  <TodoComponent type="team" title="team todos" />
</div>

app.on('debug', p => console.log(p));
app.start(document.getElementById('my-app'), {}, view);