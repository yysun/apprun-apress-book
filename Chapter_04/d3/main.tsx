import app from 'apprun';
declare const d3, topojson;

const width = 960,
  height = 720,
  origin = [71, -42],
  velocity = [.010, -.002],
  t0 = Date.now();

const sphere = { type: "Sphere" };

const projection = d3.geo.orthographic()
  .scale(height / 2.1)
  .translate([width / 2, height / 2])
  .clipAngle(90)
  .precision(.5);

const state = {};

const view = (state) => <canvas id="canvas"></canvas>

const update = {
  '#': (state,land) => ({...state, land: land || state.land})
};

const rendered = ({ land }) => {
  if (!land) return;
  const canvas = d3.select("#canvas")
    .attr("width", width)
    .attr("height", height);
  const context = canvas.node().getContext("2d");
  const path = d3.geo.path()
    .projection(projection)
    .context(context);
  const dt = Date.now() - t0;
  projection.rotate([velocity[0] * dt + origin[0], velocity[1] * dt + origin[1]]);
  context.clearRect(0, 0, width, height);
  context.beginPath();
  path(sphere);
  context.lineWidth = 2;
  context.strokeStyle = "#000";
  context.stroke();
  context.beginPath();
  path(land);
  context.lineWidth = 1;
  context.strokeStyle = "#000";
  context.stroke();
}

d3.json("./world-110m.json", function (error, topo) {
  if (error) throw error;
  const land = topojson.feature(topo, topo.objects.land);
  app.run('#', land);
});

d3.timer(function () {
  app.run('#');
});

app.start('my-app', state, view, update, { rendered });