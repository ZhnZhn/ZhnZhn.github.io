'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      return _firtsItem.cmdDescE ? _firtsItem.cmdDescE + ' ' + _firtsItem.qtDesc + '.' : _conf2.default.DESCR_EMPTY;
    } else {
      return _conf2.default.DESCR_EMPTY;
    }
  }

};

exports.default = fnDescr;
//# sourceMappingURL=fnDescr.js.map