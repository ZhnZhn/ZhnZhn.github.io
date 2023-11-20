"use strict";

exports.__esModule = true;
exports.useMdOption = exports.showModalDialog = void 0;
var _storeApi = require("../storeApi");
const [_crMdOption, _selectMdOption] = (0, _storeApi.fCrStoreSlice)("mdOption");
const _crStore = () => ({
    ..._crMdOption()
  }),
  _compStore = (0, _storeApi.createStoreWithSelector)(_crStore),
  [_set] = (0, _storeApi.getStoreApi)(_compStore);
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