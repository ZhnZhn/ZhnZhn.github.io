"use strict";

exports.__esModule = true;
exports.crSubtitle = exports.crData = exports.crConfigOption = void 0;
var _AdapterFn = require("../AdapterFn");
const FRED = 'FRED';
const _crId = _ref => {
  let {
    one,
    two,
    three = '',
    _itemKey
  } = _ref;
  return _itemKey || (two ? `${one}_${two}_${three}` : one);
};
const _crLinkItem = _ref2 => {
  let {
    linkFn,
    one,
    dfArticle
  } = _ref2;
  return linkFn === FRED ? {
    id: (one || '').replace('$', ''),
    article: dfArticle
  } : one;
};
const _crZhConfig = option => {
  const {
      title = '',
      dataSource,
      linkFn
    } = option,
    item = _crLinkItem(option),
    id = _crId(option);
  return {
    id: id,
    key: id,
    itemCaption: title,
    linkFn,
    item,
    dataSource
  };
};
const _crInfo = _ref3 => {
  let {
    title = ''
  } = _ref3;
  return {
    name: title
  };
};
const crSubtitle = _ref4 => {
  let {
    subtitle = '',
    threeCaption
  } = _ref4;
  return threeCaption ? `${subtitle}, ${threeCaption}` : subtitle;
};
exports.crSubtitle = crSubtitle;
const crData = json => json.data.reduce((_data, p) => {
  const {
    date,
    value
  } = p;
  if ((0, _AdapterFn.isNumberOrNull)(value)) {
    _data.push({
      x: (0, _AdapterFn.ymdToUTC)(date),
      y: value
    });
  }
  return _data;
}, []).reverse();
exports.crData = crData;
const crConfigOption = option => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(option)
});
exports.crConfigOption = crConfigOption;
//# sourceMappingURL=fnAdapter.js.map