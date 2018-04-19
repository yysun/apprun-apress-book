const DEFAULT_LANGUAGE = 'en';
import * as dict from './dict.json';

export let lang = document.cookie.replace(/(?:(?:^|.*;\s*)language\s*\=\s*([^;]*).*$)|^.*$/i, '$1') || 'en';

export const setLanguage = (value, name = 'language') => {
  lang = value;
  document.cookie = `${name}=${value || ""};path=/`;
}

export default (text, ...args) => {
  let txt = lang === DEFAULT_LANGUAGE ? text :
    lang && dict[lang] && dict[lang][text] || `${text}*`;

  let n = 0;
  while (txt.indexOf('%') > 0) {
    txt = txt.replace('%', args[n++] || '')
  }

  return txt;
}
