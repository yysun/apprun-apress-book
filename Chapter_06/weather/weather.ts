import { get } from './fetch';

const url = 'http://api.openweathermap.org/data/2.5/';
const appid = 'f79d649a6cf076afdcee40a6cb5aca90';

export default {
  current: q => get(`${url}weather?q=${q}&appid=${appid}&units=metric`),
  forecast: q => get(`${url}forecast?q=${q}&appid=${appid}&units=metric`)
}