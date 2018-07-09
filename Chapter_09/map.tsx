import app from 'apprun';
declare const d3, topojson;

const sphere = { type: "Sphere" };

const state = {};

const view = (state) => <canvas id="map-canvas"></canvas>

const update = {
  '##map': (state, land) => ({ ...state, land: land || state.land })
};

const rendered = ({ land }) => {
  if (!land) return;

  const element = document.getElementById('map');
  const width = element.clientWidth;
  const height = width / 2;
  const projection = d3.geo.hammer()
    .rotate([0, 0])
    .center([0, 0])
    .scale(width / 6)
    .translate([width / 2, height / 2])
    .precision(.5);

  const canvas = d3.select("#map-canvas")
    .attr("width", width)
    .attr("height", height);
  const context = canvas.node().getContext("2d");
  const path = d3.geo.path()
    .projection(projection)
    .context(context);
  context.clearRect(0, 0, width, height);
  context.beginPath();
  path(sphere);
  context.lineWidth = 1;
  context.strokeStyle = "#000";
  context.stroke();
  context.beginPath();
  path(land);
  context.lineWidth = 1;
  context.fillStyle = "#eeffee";
  context.fill();
  context.strokeStyle = "#000";
  context.stroke();
}

d3.json("./world-110m.json", function (error, topo) {
  if (error) throw error;
  const land = topojson.feature(topo, topo.objects.land);
  app.run('##map', land);
});

app.start('map', state, view, update, { rendered });