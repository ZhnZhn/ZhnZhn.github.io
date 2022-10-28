"use strict";

exports.__esModule = true;
exports.getValue = exports.getFromDate = exports.crHistOption = exports.crError = exports.crData = exports.crCaption = exports.addConfOption = exports._assign = void 0;

var _AdapterFn = require("../AdapterFn");

exports.getFromDate = _AdapterFn.getFromDate;
exports.getCaption = _AdapterFn.getCaption;
exports.getValue = _AdapterFn.getValue;
exports.crError = _AdapterFn.crError;

var _compareByFn = require("../compareByFn");

var _crFn = require("../crFn");

const _assign = Object.assign;
exports._assign = _assign;

const _crHistoricalItemConf = (data, option) => {
  const {
    itemCaption,
    dataSource,
    items,
    dfT,
    dfPn
  } = option;
  return { ...(0, _crFn.crItemConf)(option),
    ...(0, _crFn.crValueConf)(data),
    _itemKey: 'FMP/' + itemCaption,
    dataSource,
    items,
    dfT,
    dfPn
  };
};

const _crHistZhConfig = (data, option) => ({ ...(0, _AdapterFn.crZhConfig)(option),
  itemConf: _crHistoricalItemConf(data, option)
});

const _crName = items => items.map(_AdapterFn.getCaption).join(': ');

const _crInfo = _ref => {
  let {
    items,
    _itemUrl
  } = _ref;
  return {
    name: _crName(items)
  };
};

const crData = (json, option) => {
  const {
    dfPn,
    _propName
  } = option,
        _metrics = dfPn ? json[dfPn] : json,
        _data = [];

  _metrics.forEach(item => {
    const _v = parseFloat(item[_propName]);

    if (!(0, _AdapterFn._isNaN)(_v)) {
      _data.push([(0, _AdapterFn.ymdToUTC)(item.date), _v]);
    }
  });

  return _data.reverse().sort(_compareByFn.compareByDate);
};

exports.crData = crData;

const crCaption = _ref2 => {
  let {
    items
  } = _ref2;
  return {
    title: (0, _AdapterFn.getCaption)(items[0]),
    subtitle: (0, _AdapterFn.joinBy)(': ', (0, _AdapterFn.getCaption)(items[1]), (0, _AdapterFn.getCaption)(items[2]))
  };
};

exports.crCaption = crCaption;

const addConfOption = option => ({
  info: _crInfo(option)
});

exports.addConfOption = addConfOption;

const crHistOption = _ref3 => {
  let {
    option,
    data
  } = _ref3;
  return {
    info: _crInfo(option),
    zhConfig: _crHistZhConfig(data, option)
  };
};

exports.crHistOption = crHistOption;
//# sourceMappingURL=fnAdapter.js.map