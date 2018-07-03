'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SeqActions = require('./SeqActions');

var _SeqActions2 = _interopRequireDefault(_SeqActions);

var _BrowserActions = require('./BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _ChartActions = require('./ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crLoadQueryDynamic = function _crLoadQueryDynamic(option) {
  var browserType = option.browserType;

  return new _SeqActions2.default([{
    action: _BrowserActions2.default.showBrowserDynamic,
    type: 'loadBrowserDynamicCompleted',
    typeFail: 'showBrowserDynamicFailed',
    args: [browserType]
  }, {
    action: _ChartActions2.default.loadStockByQuery,
    type: 'loadStockCompleted',
    args: [option]
  }]);
};

var FactoryAction = {
  crLoadQuery: function crLoadQuery(option) {
    return _crLoadQueryDynamic(option);
  }
};

exports.default = FactoryAction;
//# sourceMappingURL=FactoryAction.js.map