import app from 'apprun';

const state = {};

const view = state => <div></div>;

const update = {};

const rendered = state => { }

app.start(document.body, state, view, update, { rendered });