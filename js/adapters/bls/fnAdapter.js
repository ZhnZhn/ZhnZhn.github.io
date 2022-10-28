"use strict";

exports.__esModule = true;
exports.crData = exports.crConfOption = void 0;

var _AdapterFn = require("../AdapterFn");

const _crZhConfig = _ref => {
  let {
    _itemKey,
    itemCaption,
    dataSource,
    dfTitle,
    linkItem
  } = _ref;
  return {
    id: _itemKey,
    key: _itemKey,
    item: { ...linkItem
    },
    linkFn: 'DF',
    itemCaption,
    dataSource: (0, _AdapterFn.joinBy)(": ", dataSource, dfTitle)
  };
};

const _crInfo = _ref2 => {
  let {
    itemCaption
  } = _ref2;
  return {
    name: itemCaption
  };
};

const crData = json => json.Results.series[0].data.reduce((_data, p) => {
  const {
    year,
    period = '',
    value
  } = p,
        _m = parseInt(('' + period).replace('M', ''), 10);

  if ((0, _AdapterFn.isTypeNumber)(_m) && _m > 0 && _m < 13) {
    _data.push({
      x: (0, _AdapterFn.ymdToUTC)(year + "-" + _m),
      y: parseFloat(value)
    });
  }

  return _data;
}, []).reverse();

exports.crData = crData;

const crConfOption = option => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(option)
});

exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map