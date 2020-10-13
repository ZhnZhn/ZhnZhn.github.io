"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _SeqActions = _interopRequireDefault(require("./SeqActions"));

var _BrowserActions = _interopRequireDefault(require("./BrowserActions"));

var _ChartActions = _interopRequireDefault(require("./ChartActions"));

var _crLoadQueryDynamic = function _crLoadQueryDynamic(option) {
  var _ref = option || {},
      browserType = _ref.browserType;

  return new _SeqActions["default"]([{
    action: _BrowserActions["default"].showBrowserDynamic,
    type: 'loadBrowserDynamicCompleted',
    typeFail: 'showBrowserDynamicFailed',
    args: [browserType]
  }, {
    action: _ChartActions["default"].loadStockByQuery,
    type: 'loadStockCompleted',
    args: [option]
  }]);
};

var FactoryAction = {
  crLoadQuery: _crLoadQueryDynamic
};
var _default = FactoryAction;
exports["default"] = _default;
//# sourceMappingURL=FactoryAction.js.map