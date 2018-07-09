import app, { Component } from 'apprun';
import TypeAhead from './typeahead';

const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const search = text => states.filter(s => s.toLowerCase().indexOf(text.toLowerCase()) >= 0);

class TypeAheadApp extends Component {
  state = '';

  view = (state) => <div>
    <h3>Hello {state}</h3>
    <TypeAhead id="ta"
      onSearch={search}
      onSelect={text => this.run('input', text)}/>
  </div>;

  update = {
    'input': (state, text) => text
  }
}

app.render(document.getElementById('my-app'), <TypeAheadApp />);