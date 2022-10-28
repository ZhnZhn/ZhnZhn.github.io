"use strict";

exports.__esModule = true;
exports.crSubtitle = exports.crData = exports.crConfigOption = void 0;

var _AdapterFn = require("../AdapterFn");

const FRED = 'FRED';

const _crId = _ref => {
  let {
    value,
    two,
    three = ''
  } = _ref;
  return two ? value + "_" + two + "_" + three : value;
};

const _crLinkItem = option => {
  const {
    linkFn,
    value
  } = option;
  return linkFn === FRED ? {
    id: (value || '').replace('$', ''),
    article: option.dfArticle
  } : value;
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

const _crInfo = _ref2 => {
  let {
    title = ''
  } = _ref2;
  return {
    name: title
  };
};

const crSubtitle = _ref3 => {
  let {
    subtitle = '',
    threeCaption
  } = _ref3;
  return threeCaption ? subtitle + ", " + threeCaption : subtitle;
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