"use strict";

exports.__esModule = true;
exports.useMsChartCont = exports.useMsAbout = exports.useMdOption = exports.showModalDialog = exports.showAbout = exports.hideAbout = exports.closeChartCont = void 0;
var _storeApi = require("../storeApi");
const [_crMsAbout, _selectMsAbout] = (0, _storeApi.fCrStoreSlice)("msAbout", "is"),
  [_crMsChartCont, _selectMsChartCont] = (0, _storeApi.fCrStoreSlice)("msChartCont"),
  [_crMdOption, _selectMdOption] = (0, _storeApi.fCrStoreSlice)("mdOption");
const _crStore = () => ({
    ..._crMsAbout(true),
    ..._crMdOption()
  }),
  _compStore = (0, _storeApi.createStoreWithSelector)(_crStore),
  [_set] = (0, _storeApi.getStoreApi)(_compStore);
const useMsAbout = exports.useMsAbout = (0, _storeApi.fCrUse)(_compStore, _selectMsAbout);
const showAbout = () => _set(_crMsAbout(true));
exports.showAbout = showAbout;
const hideAbout = () => _set(_crMsAbout(false));
exports.hideAbout = hideAbout;
const useMsChartCont = exports.useMsChartCont = (0, _storeApi.fCrUse)(_compStore, _selectMsChartCont);
const closeChartCont = chartType => _set(_crMsChartCont({
  id: chartType
}));
exports.closeChartCont = closeChartCont;
const useMdOption = exports.useMdOption = (0, _storeApi.fCrUse)(_compStore, _selectMdOption);
const showModalDialog = function (modalDialogType, option) {
  if (option === void 0) {
    option = {};
  }
  option.modalDialogType = modalDialogType;
  _set(_crMdOption({
    ...option
  }));
};
exports.showModalDialog = showModalDialog;
//# sourceMappingURL=compStore.js.map