"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _crFn = require("../crFn");

const _isArr = Array.isArray;

const _crInfo = _ref => {
  let {
    title,
    subtitle,
    items
  } = _ref;
  return {
    name: title + ": " + subtitle + " (" + (items[1].c || '') + ")"
  };
};

const _getCountryIndicator = _ref2 => {
  let {
    items = []
  } = _ref2;
  return {
    country: items[0].v,
    indicator: items[1].v
  };
};

const fnAdapter = {
  crError: _crFn.crError,
  getCi: _getCountryIndicator,
  crData: json => {
    const arrIn = json[1];

    if (!_isArr(arrIn)) {
      return [];
    }

    const d = [];
    arrIn.forEach(p => {
      if (p && p.value != null && p.date) {
        d.push({
          x: (0, _AdapterFn.ymdToUTC)(p.date),
          y: p.value
        });
      }
    });
    return d.reverse();
  },
  crConfOption: option => {
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
        item: { ...linkItem
        },
        dataSource
      }
    };
  }
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map