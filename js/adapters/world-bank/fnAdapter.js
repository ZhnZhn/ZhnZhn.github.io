"use strict";

exports.__esModule = true;
exports.getCi = exports.crData = exports.crConfOption = void 0;
var _AdapterFn = require("../AdapterFn");
const _crInfo = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return {
    name: title + ": " + subtitle
  };
};
const getCi = _ref2 => {
  let {
    items = []
  } = _ref2;
  return [
  //country
  (0, _AdapterFn.getValue)(items[0]),
  //indicator
  (0, _AdapterFn.getValue)(items[1])];
};
exports.getCi = getCi;
const crData = _ref3 => {
  let [metaData, data] = _ref3;
  return (0, _AdapterFn.isArr)(data) ? data.reduce((d, p) => {
    if (p && p.value != null && p.date) {
      d.push([(0, _AdapterFn.ymdToUTC)(p.date), p.value]);
    }
    return d;
  }, []).reverse() : [];
};
exports.crData = crData;
const crConfOption = option => {
  const {
    _itemKey,
    title,
    linkItem,
    dataSource
  } = option;
  return {
    info: _crInfo(option),
    zhConfig: {
      key: _itemKey,
      id: _itemKey,
      itemCaption: title,
      linkFn: 'DF',
      item: {
        ...linkItem
      },
      dataSource
    }
  };
};
exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map