"use strict";

exports.__esModule = true;
exports.initOptionFromDateIf = exports.crMsgSetting = exports.addSettingsTo = void 0;
var _dateFn = require("../../utils/dateFn");
var _Msg = require("../../constants/Msg");
var _storeApi = require("../storeApi");
var _settingStore = require("../stores/settingStore");
const _assign = Object.assign;
const _addBoolOptionTo = (options, propName) => {
  if ((0, _storeApi.isUndef)(options[propName])) {
    options[propName] = (0, _settingStore.isSetting)(propName);
  }
};
const addSettingsTo = (options, confItem, itemProps) => {
  const {
    loadId
  } = options;
  _assign(options, confItem, itemProps, {
    apiKey: (0, _settingStore.getKey)(loadId),
    proxy: (0, _settingStore.getProxy)(loadId)
  });
  _addBoolOptionTo(options, 'isDrawDeltaExtrems');
  _addBoolOptionTo(options, 'isNotZoomToMinMax');
};
exports.addSettingsTo = addSettingsTo;
const _checkMsgApiKey = _ref => {
  let {
    apiKey,
    loadId,
    isKeyFeature,
    isPremium
  } = _ref;
  return apiKey ? '' : (0, _settingStore.isApiKeyRequired)(loadId) ? (0, _Msg.withoutApiKey)((0, _settingStore.getApiTitle)(loadId)) : isKeyFeature ? _Msg.ERR_FEATURE_WITHOUT_KEY : isPremium ? _Msg.ERR_PREMIUM_WITHOUT_KEY : '';
};
const _checkProxy = _ref2 => {
  let {
    proxy,
    loadId
  } = _ref2;
  return (0, _settingStore.isProxyRequired)(loadId) && !proxy ? (0, _Msg.withoutProxy)((0, _settingStore.getApiTitle)(loadId)) : '';
};
const crMsgSetting = option => _checkMsgApiKey(option) || _checkProxy(option);
exports.crMsgSetting = crMsgSetting;
const initOptionFromDateIf = option => {
  const {
    fromDate,
    nInitFromDate
  } = option;
  if (!fromDate) {
    option.fromDate = nInitFromDate ? (0, _dateFn.getFromDate)(nInitFromDate) : (0, _dateFn.getFromDate)(2);
  }
};
exports.initOptionFromDateIf = initOptionFromDateIf;
//# sourceMappingURL=itemStoreFn.js.map