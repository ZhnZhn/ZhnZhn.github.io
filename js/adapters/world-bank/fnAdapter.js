"use strict";

exports.__esModule = true;
exports.crData = exports.crConfOption = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
const _crInfo = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return {
    name: `${title}: ${subtitle}`
  };
};
const crData = _ref2 => {
  let [metaData, data] = _ref2;
  return (0, _isTypeFn.isArr)(data) ? data.reduce((d, p) => {
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