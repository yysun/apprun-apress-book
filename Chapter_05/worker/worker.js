importScripts('//unpkg.com/apprun@latest/dist/apprun.js');

onmessage = function (e) {
  const { name, parameters } = JSON.parse(e.data);
  app.run(name, ...parameters);
}

const page = {
  run: (name, ...parameters) => postMessage (
    JSON.stringify({ name, parameters }))
};

app.on('+1', n => page.run('#', n + 1));
app.on('-1', n => page.run('#', n - 1));
