
const _compareByText = (a, b) => {
  if (a.text < b.text) return -1;
  if (a.text > b.text) return 1;
  return 0;
}

const loadItems = (url, proxy) => {
  const _url = proxy
          ? proxy + url
          : url;
  return fetch(_url, { cache: "default" })
    .then(res => res.json())
    .then(json => {
      if (Array.isArray(json)) {
         json.sort(_compareByText)
      }
      return json;
    })
}

export default loadItems
