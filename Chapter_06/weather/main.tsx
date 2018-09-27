import app from 'apprun';
import weather from './weather';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const state = {
  err: ''
};

const view = (state) => !state.name ? <h1>{state.err} : {state.city}</h1> : <>
  <div className="weather">
    <div className="today">
      {days[new Date(state.dt * 1000).getDay()]}
    </div>
    <div className="city">
      {state.name}, {state.sys.country}
    </div>
    <div className="temp">
      <i className={`wi wi-owm-${state.weather[0].id}`}></i>
      {state.main.temp}<sup>&deg;</sup>
      <span className="unit">c</span>
    </div>
    <div className="desc">
      {state.weather[0].main} - {state.weather[0].description}
    </div>
  </div>
  <div className="forecast">
    <ul> {state.list.map(w => <li>
      <span className="day">{days[new Date(w.dt * 1000).getDay()]}</span>
      <span className="hour">{new Date(w.dt * 1000).getHours()}:00</span>
      <i className={`wi wi-owm-${w.weather[0].id}`}></i>
      <span className="temp">{w.main.temp_min}<sup>&deg;</sup></span>-
        <span className="temp">{w.main.temp_max} <sup>&deg;</sup></span>
    </li>)}
    </ul>
  </div>
</>;

const update = {
  '#': async (_, city) => {
    try {
      city = city || 'Toronto,CA';
      const current = await weather.current(city);
      const forecast = await weather.forecast(city) as any;
      return { ...current, list: forecast.list };
    } catch (err) {
      return { err: err.message, city };
    }
  }
};

app.start('my-app', state, view, update);