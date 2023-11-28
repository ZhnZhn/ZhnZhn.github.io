"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _SeqActions = _interopRequireDefault(require("./SeqActions"));
var _browserStore = require("../stores/browserStore");
var _ChartActions = require("./ChartActions");
const _crLoadQueryDynamic = option => {
  const {
    browserType
  } = option || {};
  return new _SeqActions.default([{
    action: _browserStore.showBrowser,
    args: [browserType]
  }, {
    action: _ChartActions.ChartActions[_ChartActions.CHAT_LOAD_BY_QUERY],
    type: _ChartActions.CHAT_LOAD_COMPLETED,
    args: [option]
  }]);
};
const FactoryAction = {
  crLoadQuery: _crLoadQueryDynamic
};
var _default = exports.default = FactoryAction;
//# sourceMappingURL=FactoryAction.js.map