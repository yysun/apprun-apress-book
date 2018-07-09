
import app from 'apprun';

const get = async (url) => { };

const state = {};

const view = (state) => <div>{state}</div>;

const update = {
  '#': async (state) => {
    try {
      const data = await get('http://...');
      return { ...state, data }
    } catch (err) {
      return { ...state, err }
    }
  }
};

app.start('my-app', state, view, update);