"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _SeqActions = _interopRequireDefault(require("./SeqActions"));

var _BrowserActions = require("./BrowserActions");

var _ChartActions = _interopRequireWildcard(require("./ChartActions"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const _crLoadQueryDynamic = option => {
  const {
    browserType
  } = option || {};
  return new _SeqActions.default([{
    action: _BrowserActions.BrowserActions.showBrowserDynamic,
    type: 'loadBrowserDynamicCompleted',
    typeFail: 'showBrowserDynamicFailed',
    args: [browserType]
  }, {
    action: _ChartActions.default[_ChartActions.CHAT_LOAD_BY_QUERY],
    type: _ChartActions.CHAT_LOAD_COMPLETED,
    args: [option]
  }]);
};

const FactoryAction = {
  crLoadQuery: _crLoadQueryDynamic
};
var _default = FactoryAction;
exports.default = _default;
//# sourceMappingURL=FactoryAction.js.map