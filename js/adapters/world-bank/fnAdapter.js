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
      two = _ref.two;
  return {
    name: title + ": " + subtitle + " (" + two + ")"
  };
};

var fnAdapter = {
  crId: function crId(option) {
    var one = option.one,
        two = option.two;
    return (one || '') + "_" + (two || '');
  },
  crData: function crData(arrIn) {
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
  crConfigOptions: function crConfigOptions(option) {
    var title = option.title,
        linkItem = option.linkItem,
        dataSource = option.dataSource,
        _id = fnAdapter.crId(option);

    return {
      info: _crInfo(option),
      zhConfig: {
        key: _id,
        id: _id,
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