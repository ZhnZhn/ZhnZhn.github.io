"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var ymdToUTC = _AdapterFn["default"].ymdToUTC,
    _isArr = Array.isArray;

var _crInfo = function _crInfo(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      items = _ref.items;
  return {
    name: title + ": " + subtitle + " (" + (items[1].c || '') + ")"
  };
};

var _getCountryIndicator = function _getCountryIndicator(_ref2) {
  var _ref2$items = _ref2.items,
      items = _ref2$items === void 0 ? [] : _ref2$items;
  return {
    country: items[0].v,
    indicator: items[1].v
  };
};

var fnAdapter = {
  getCi: _getCountryIndicator,
  crData: function crData(json) {
    var arrIn = json[1];

    if (!_isArr(arrIn)) {
      return [];
    }

    var d = [];
    arrIn.forEach(function (p) {
      if (p && p.value != null && p.date) {
        d.push({
          x: ymdToUTC(p.date),
          y: p.value
        });
      }
    });
    return d.reverse();
  },
  crConfOption: function crConfOption(option) {
    var _itemKey = option._itemKey,
        title = option.title,
        linkItem = option.linkItem,
        dataSource = option.dataSource;
    return {
      info: _crInfo(option),
      zhConfig: {
        key: _itemKey,
        id: _itemKey,
        itemCaption: title,
        linkFn: 'DF',
        item: (0, _extends2["default"])({}, linkItem),
        dataSource: dataSource
      }
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map