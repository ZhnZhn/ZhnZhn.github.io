"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crFn = require("../crFn");

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

const _crZhConfig = (id, option, data) => {
  const {
    symbol,
    period,
    dataSource
  } = option;
  return {
    dataSource,
    id: id,
    key: id,
    linkFn: "NASDAQ",
    item: symbol,
    itemCaption: symbol,
    itemConf: { ...(0, _crFn.crItemConf)(option),
      ...(0, _crFn.crValueConf)(data),
      _itemKey: id,
      items: [{
        "v": symbol
      }, {
        "v": period
      }],
      dataSource
    }
  };
};

const _crInfo = title => ({
  name: title,
  frequency: "Daily"
});

const toChart = (0, _crAdapterOHLCV.default)({
  crAddConfig: _ref => {
    let {
      title,
      option,
      id,
      data
    } = _ref;
    return {
      info: _crInfo(title),
      zhConfig: _crZhConfig(id, option, data)
    };
  }
});
var _default = toChart;
exports.default = _default;
//# sourceMappingURL=toChart.js.map