import app from 'apprun';
const state = 0;

const view = (state) => {
  console.log(state)
  return <div>
    <button onclick={() => app.run("history-prev")}> &lt;&lt; </button>
    <button onclick={() => app.run("history-next")}> &gt;&gt; </button>
    <h1>{state}</h1>
    <button onclick={() => app.run("DECREASE")}>-1</button>
    <button onclick={() => app.run("INCREASE")}>+1</button>
  </div>;
}

const update = {
  'INCREASE': (state) => state + 1,
  'DECREASE': (state) => state - 1
};

app.start('my-app', state, view, update, {history: true});
