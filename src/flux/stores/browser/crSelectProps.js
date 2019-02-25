
const _isArray = Array.isArray;

const _mergeSelectProps = (selectProps, obj) => {
  const arr = [...selectProps, ...(obj.selectProps || [])];
  return arr.length > 0
    ? arr
    : undefined;
};
const _crSelectProps = (items, rootUri) => {
  if (!_isArray(items)) {
    return;
  }
  const _rootUri = rootUri ? rootUri : ''
  , selectProps = [];
  items.forEach(item => {
    if (_isArray(item)) {
      selectProps.push({
        id: item[0],
        caption: item[1],
        uri: `${_rootUri}${item[2]}`,
        jsonProp: item[3]
      })
    }
  })
  return { selectProps };
}

const crSelectProps = (baseProps, dialogProps) => {
  const { selectProps } = baseProps
  , _selectItems = _isArray(selectProps)
      ? _mergeSelectProps(selectProps, dialogProps)
      : dialogProps.selectProps
  , _rootUri = baseProps.rootUri || dialogProps.rootUri
  return _crSelectProps(_selectItems, _rootUri);
};

export default crSelectProps
