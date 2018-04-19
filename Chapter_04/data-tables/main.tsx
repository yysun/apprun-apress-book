import app from 'apprun';
declare var $;

const buildData = (count = 1000) => {
  function _random(max) {
    return Math.round(Math.random() * 1000) % max;
  }
  var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
  var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
  var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
  var data = [];
  for (var i = 0; i < count; i++)
    data.push({
      id: i,
      adjective: adjectives[_random(adjectives.length)],
      colour: colours[_random(colours.length)],
      noun: nouns[_random(nouns.length)]
    });
  return data;
}
const state = {
  data: buildData()
};

const view = ({ data }) => <table id='example' className="table table-striped table-bordered">
  <thead>
    <tr>
      <th>id</th>
      <th>adjective</th>
      <th>colour</th>
      <th>noun</th>
    </tr>
  </thead>
  <tbody> {
    data.map(d=> <tr>
      <td>{d.id}</td>
      <td>{d.adjective}</td>
      <td>{d.colour}</td>
      <td>{d.noun}</td>
    </tr>)
  } </tbody>
</table>;

const update = {};

const rendered = state => {
  $('#example').DataTable();
}

app.start('my-app', state, view, update, { rendered });