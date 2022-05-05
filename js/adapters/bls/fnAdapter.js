"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _crFn = require("../crFn");

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

const fnAdapter = {
  crHm: _crFn.crHm,
  crError: _crFn.crError,
  getYear: _AdapterFn.getYear,
  getCurrentYear: _AdapterFn.getCurrentYear,
  crData: json => {
    const data = json.Results.series[0].data,
          _data = [];
    data.forEach(p => {
      const {
        year,
        period = '',
        value
      } = p,
            _m = parseInt(('' + period).replace('M', ''), 10);

      if (typeof _m === 'number' && _m > 0 && _m < 13) {
        _data.push({
          x: (0, _AdapterFn.ymdToUTC)(year + "-" + _m),
          y: parseFloat(value)
        });
      }
    });
    return _data.reverse();
  },
  crConfOption: option => ({
    zhConfig: _crZhConfig(option),
    info: _crInfo(option)
  })
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map