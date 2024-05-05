import {
  isArr,
  isNumber,
  isStr
} from '../../storeApi';

const _crJsonProp = strOr => isStr(strOr)
 ? strOr
 : void 0
, _crItemProps = (
  id,
  caption,
  rootUri,
  pathToken
) => ({
  id,
  caption,
  uri: `${rootUri}${pathToken}.json`
})
, _crDfItem = (
  item,
  rootUri
) => ({
  ..._crItemProps(item[0], item[1], rootUri, item[2]),
  jsonProp: _crJsonProp(item[3])
})
, _crIdItem = (
  item,
  rootUri
) => ({
  ..._crItemProps(item[0], item[0], rootUri, item[1]),
  jsonProp: _crJsonProp(item[2]),
  isWithInput: Boolean(item[3])
})
, _crS2Item = (
  item,
  rootUri
) => item.length === 3
  ? _crDfItem(item, rootUri)
  : {
    ..._crItemProps(item[0], item[2], rootUri, item[3]),
    type: "two",
    oneCaption: item[1],
    twoCaption: item[2],
    isAddTitle: item[4]
  };

const _rFns = {
  df: _crDfItem,
  id: _crIdItem,
  s2: _crS2Item
};

const _mergeSelectProps = (selectProps, obj) => {
  const arr = [...selectProps];
  (obj.selectProps || []).forEach(_arr => {
    const _rowIndex = _arr[_arr.length - 1];
    if (isNumber(_rowIndex)){
      arr.splice(_rowIndex-1, 0, _arr)
    } else {
      arr.push(_arr)
    }
  })
  return arr.length > 0
    ? arr
    : void 0;
};
const _crSelectProps = (
  items,
  rootUri,
  crItem
) => isArr(items) ? {
  selectProps: items.reduce((props, item) => {
    props.push(
      isArr(item) && rootUri
         ? crItem(item, rootUri)
         : item
    )
    return props;
  }, [])
} : void 0;

const crSelectProps = (
  initialProps,
  dialogProps
) => {
  const {
    selectProps,
    rootUri,
    spT
  } = initialProps || {}
  , _selectItems = isArr(selectProps)
      ? _mergeSelectProps(selectProps, dialogProps)
      : dialogProps.selectProps
  , _rootUri = dialogProps.rootUri || rootUri
  , _spT = dialogProps.spT || spT
  , _crItem = (_spT && _rFns[_spT]) || _rFns.df;
  return _crSelectProps(
    _selectItems,
    _rootUri,
    _crItem
  );
};

export default crSelectProps
