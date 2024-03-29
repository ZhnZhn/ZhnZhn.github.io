"use strict";

exports.__esModule = true;
exports.useMsShowDialog = exports.useMsCloseDialog = exports.useMsAbout = exports.useMdOption = exports.showOptionDialog = exports.showModalDialog = exports.showDialog = exports.showAlertDialog = exports.showAbout = exports.hideAbout = exports.closeDialog = exports.closeChartContainer = void 0;
var _storeApi = require("../storeApi");
var _ModalDialogType = require("../../constants/ModalDialogType");
var _chartCheckBoxLogic = require("./chartCheckBoxLogic");
var _contCheckBoxLogic = require("./contCheckBoxLogic");
var _browserLogic = require("./browserLogic");
var _dialogLogic = require("./dialogLogic");
const [_crMsAbout, _selectMsAbout] = (0, _storeApi.fCrStoreSlice)("msAbout", "is"),
  [_crMdOption, _selectMdOption] = (0, _storeApi.fCrStoreSlice)("mdOption"),
  [_crMsShowDialog, _selectMsShowDialog] = (0, _storeApi.fCrStoreSlice)("msShowDialog"),
  [_crMsCloseDialog, _selectMsCloseDialog] = (0, _storeApi.fCrStoreSlice)("msCloseDialog");
const _crStore = () => ({
    ..._crMsAbout(true),
    ..._crMdOption()
  }),
  _compStore = (0, _storeApi.createStoreWithSelector)(_crStore),
  [_set] = (0, _storeApi.getStoreApi)(_compStore);
const _setMsAbout = is => _set(_crMsAbout(is));
const useMsAbout = exports.useMsAbout = (0, _storeApi.fCrUse)(_compStore, _selectMsAbout);
const showAbout = () => _setMsAbout(true);
exports.showAbout = showAbout;
const hideAbout = () => _setMsAbout(false);
exports.hideAbout = hideAbout;
const closeChartContainer = (chartType, browserType) => {
  (0, _contCheckBoxLogic.uncheckActiveContCheckBox)(chartType);
  (0, _chartCheckBoxLogic.uncheckActiveCheckbox)(chartType);
  (0, _browserLogic.setMenuItemClose)(chartType, browserType);
};
exports.closeChartContainer = closeChartContainer;
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
const showAlertDialog = exports.showAlertDialog = (0, _storeApi.bindTo)(showModalDialog, _ModalDialogType.MDT_ALERT);
const INITED_DIALOGS = {};
const useMsShowDialog = exports.useMsShowDialog = (0, _storeApi.fCrUse)(_compStore, _selectMsShowDialog);
const showDialog = (type, browserType, dialogConfOr) => {
  (0, _dialogLogic.showDialogImpl)(INITED_DIALOGS, {
    type,
    browserType,
    dialogConfOr
  }).then(r => {
    _set(_crMsShowDialog(r));
  });
};
exports.showDialog = showDialog;
const showOptionDialog = (type, option) => {
  (0, _dialogLogic.showOptionDialogImpl)(INITED_DIALOGS, {
    type,
    data: option
  }).then(r => {
    _set(_crMsShowDialog(r));
  }).catch(err => {
    showAlertDialog({
      alertCaption: 'Failed Load',
      alertDescr: err.message
    });
  });
};
exports.showOptionDialog = showOptionDialog;
const useMsCloseDialog = exports.useMsCloseDialog = (0, _storeApi.fCrUse)(_compStore, _selectMsCloseDialog);
const closeDialog = Comp => {
  _set(_crMsCloseDialog({
    type: Comp.key,
    caption: Comp.props.caption
  }));
};
exports.closeDialog = closeDialog;
//# sourceMappingURL=compStore.js.map