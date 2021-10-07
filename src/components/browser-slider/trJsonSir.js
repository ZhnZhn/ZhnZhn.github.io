
const trJsonSir = json => {
  json.forEach(item => {
    if (item.type === 't') {
      item.text = `${item.id}: ${item.text}`
    }
  })
  return json;
};

export default trJsonSir
