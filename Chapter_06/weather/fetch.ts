export const fetchJSON = async (url: string, request?: RequestInit) => {
  const response = await fetch(url, request);
  if (!response.ok) {
    const data = await response.text();
    throw data;
  }
  return response.json();
}

export const get = (url, headers?) => fetchJSON(url, { headers });
export const post = (url, data, headers?) => fetchJSON(url, {
  method: 'POST',
  headers,
  body: JSON.stringify(data)
});