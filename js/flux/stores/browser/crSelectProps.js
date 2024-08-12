"use strict";

exports.__esModule = true;
exports.default = void 0;
var _storeApi = require("../../storeApi");
const _crJsonProp = strOr => (0, _storeApi.isStr)(strOr) ? strOr : void 0,
  _crItemProps = (id, caption, rootUri, pathToken) => ({
    id,
    caption,
    uri: `${rootUri}${pathToken}.json`
  }),
  _crDfItem = (item, rootUri) => ({
    ..._crItemProps(item[0], item[1], rootUri, item[2]),
    jsonProp: _crJsonProp(item[3])
  }),
  _crIdItem = (item, rootUri) => ({
    ..._crItemProps(item[0], item[0], rootUri, item[1]),
    jsonProp: _crJsonProp(item[2]),
    isWithInput: Boolean(item[3])
  }),
  _crId3Item = (item, rootUri) => ({
    ..._crItemProps(item[2], item[0], rootUri, item[1])
  }),
  _crS2Item = (item, rootUri) => item.length === 3 ? _crDfItem(item, rootUri) : {
    ..._crItemProps(item[0], item[2], rootUri, item[3]),
    type: "two",
    oneCaption: item[1],
    twoCaption: item[2],
    isAddTitle: item[4]
  };
const _rFns = {
  df: _crDfItem,
  id: _crIdItem,
  id3: _crId3Item,
  s2: _crS2Item
};
const _mergeSelectProps = (selectProps, obj) => {
  const arr = [...selectProps];
  (obj.selectProps || []).forEach(_arr => {
    const _rowIndex = _arr[_arr.length - 1];
    if ((0, _storeApi.isNumber)(_rowIndex)) {
      arr.splice(_rowIndex - 1, 0, _arr);
    } else {
      arr.push(_arr);
    }
  });
  return arr.length > 0 ? arr : void 0;
};
const _crSelectProps = (items, rootUri, crItem) => (0, _storeApi.isArr)(items) ? {
  selectProps: items.reduce((props, item) => {
    props.push((0, _storeApi.isArr)(item) && rootUri ? crItem(item, rootUri) : item);
    return props;
  }, [])
} : void 0;
const crSelectProps = (initialProps, dialogProps) => {
  const {
      selectProps,
      rootUri,
      spT
    } = initialProps || {},
    _selectItems = (0, _storeApi.isArr)(selectProps) ? _mergeSelectProps(selectProps, dialogProps) : dialogProps.selectProps,
    _rootUri = dialogProps.rootUri || rootUri,
    _spT = dialogProps.spT || spT,
    _crItem = _spT && _rFns[_spT] || _rFns.df;
  return _crSelectProps(_selectItems, _rootUri, _crItem);
};
var _default = exports.default = crSelectProps;
//# sourceMappingURL=crSelectProps.js.map