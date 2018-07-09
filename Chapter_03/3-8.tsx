import app from 'apprun';

const state = {};

const view = state => { };

const update = {};

const STORAGE_KEY = 'to-do-list';
const rendered = state => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const stored = localStorage.getItem(STORAGE_KEY)

app.start('my-app', stored ? JSON.parse(stored) : state, view, update, { rendered });
