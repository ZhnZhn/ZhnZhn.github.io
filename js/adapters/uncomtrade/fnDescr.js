"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _conf = _interopRequireDefault(require("./conf"));

var fnDescr = {
  toDescr: function toDescr(json) {
    var dataset = json.dataset,
        _firtsItem = dataset[0];

    if (Array.isArray(dataset) && _firtsItem) {
      var i = 0,
          max = dataset.length;

      for (; i < max; i++) {
        var _dataset$i = dataset[i],
            cmdDescE = _dataset$i.cmdDescE,
            qtDesc = _dataset$i.qtDesc,
            TradeQuantity = _dataset$i.TradeQuantity;

        if (TradeQuantity) {
          return cmdDescE + ' ' + qtDesc + '.';
        }
      }

      return _firtsItem.cmdDescE ? _firtsItem.cmdDescE + ' ' + _firtsItem.qtDesc + '.' : _conf["default"].DESCR_EMPTY;
    } else {
      return _conf["default"].DESCR_EMPTY;
    }
  }
};
var _default = fnDescr;
exports["default"] = _default;
//# sourceMappingURL=fnDescr.js.map