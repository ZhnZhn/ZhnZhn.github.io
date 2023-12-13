"use strict";

exports.__esModule = true;
exports.addSettingsTo = void 0;
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
//# sourceMappingURL=itemStoreFn.js.map