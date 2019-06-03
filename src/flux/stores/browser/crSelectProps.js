
const _isArr = Array.isArray;

const _crDfItem = (item, rootUri) => ({
  id: item[0],
  caption: item[1],
  uri: `${rootUri}${item[2]}`,
  jsonProp: item[3]
})
const _crIdItem = (item, rootUri) => ({
  id: item[0],
  caption: item[0],
  uri: `${rootUri}${item[1]}.json`,
  jsonProp: item[2],
  isWithInput: Boolean(item[3])
});

const _rFns = {
  df: _crDfItem,
  id: _crIdItem
};

const _mergeSelectProps = (selectProps, obj) => {
  const arr = [...selectProps, ...(obj.selectProps || [])];
  return arr.length > 0
    ? arr
    : undefined;
};
const _crSelectProps = (items, rootUri='', spT) => {
  if (!_isArr(items)) {
    return;
  }
  const selectProps = []
  , _crItem = (spT && _rFns[spT]) || _rFns.df;
  items.forEach(item => {
    if (_isArr(item)) {
      selectProps.push(_crItem(item, rootUri))
    }
  })
  return { selectProps };
}

const crSelectProps = (initialProps={}, dialogProps) => {
  const { selectProps, rootUri, spT } = initialProps
  , _selectItems = _isArr(selectProps)
      ? _mergeSelectProps(selectProps, dialogProps)
      : dialogProps.selectProps
  , _rootUri = dialogProps.rootUri || rootUri
  , _spT = dialogProps.spT || spT;
  return _crSelectProps(_selectItems, _rootUri, _spT);
};

export default crSelectProps
