export interface IRequest {
  method?: 'GET' | 'POST',
  headers?: {}
  body?
}
export default function getJSON(url: string, request: IRequest = {}) {

  return new Promise(function (resolve, reject) {
    const req = new XMLHttpRequest();
    req.open(request.method || 'GET', url);
    if (request.headers) {
      for (let name in request.headers) {
        req.setRequestHeader(name, request.headers[name]);
      }
    }
    req.onload = () => {
      if (req.status == 200) {
        resolve(JSON.parse(req.response));
      }
      else {
        reject(JSON.parse(req.response));
      }
    };
    req.onerror = (err) => {
      reject(Error("Network Error"));
    };
    req.send(JSON.stringify(request.body));
  });
}

export const get = (url, headers?) => getJSON(url, { headers });
export const post = (url, data, headers?) => getJSON(url, {
  method: 'POST',
  headers,
  body: JSON.stringify(data)
});