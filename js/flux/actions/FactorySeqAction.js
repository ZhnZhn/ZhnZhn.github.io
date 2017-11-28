'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BrowserConfig = require('../../constants/BrowserConfig');

var _BrowserConfig2 = _interopRequireDefault(_BrowserConfig);

var _SeqActions = require('./SeqActions');

var _SeqActions2 = _interopRequireDefault(_SeqActions);

var _BrowserActions = require('./BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _ChartActions = require('./ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FactorySeqAction = {
  crLoadQueryDynamic: function crLoadQueryDynamic(option) {
    var browserType = option.browserType;

    var seq = new _SeqActions2.default([{
      action: _BrowserActions2.default.showBrowserDynamic,
      type: 'loadBrowserDynamicCompleted',
      args: [_BrowserConfig2.default[browserType]]
    }, {
      action: _ChartActions2.default.loadStockByQuery,
      type: 'loadStockCompleted',
      args: [option]
    }]);
    return seq;
  }
};

exports.default = FactorySeqAction;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\FactorySeqAction.js.map