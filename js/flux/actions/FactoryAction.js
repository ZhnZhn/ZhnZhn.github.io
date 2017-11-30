'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _SeqActions = require('./SeqActions');

var _SeqActions2 = _interopRequireDefault(_SeqActions);

var _BatchActions = require('./BatchActions');

var _BatchActions2 = _interopRequireDefault(_BatchActions);

var _BrowserActions = require('./BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _ChartActions = require('./ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SUBTITLE = 'Loaded from URL Query';

var _crLoadQueryStatic = function _crLoadQueryStatic(option) {
  var browserType = option.browserType,
      chartType = option.chartType;

  return new _BatchActions2.default([{
    action: _BrowserActions2.default.showBrowser,
    args: [browserType]
  }, {
    action: _ChartActions2.default.loadStock,
    args: [chartType, browserType, option]
  }]);
};

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
    var browserType = option.browserType,
        chartType = option.chartType,
        _ref = _ChartStore2.default.getSourceConfig(browserType, chartType) || {},
        dialogProps = _ref.dialogProps;

    option.subtitle = SUBTITLE;
    if (dialogProps) {
      Object.assign(option, dialogProps);
      return _crLoadQueryStatic(option);
    } else {
      return _crLoadQueryDynamic(option);
    }
  }
};

exports.default = FactoryAction;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\FactoryAction.js.map