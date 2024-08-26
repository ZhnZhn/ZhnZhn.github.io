"use strict";

exports.__esModule = true;
exports.showZoom = exports.showSettings = exports.showReload = exports.showPasteTo = exports.showDescription = exports.showCustomizeExport = exports.showAsk = exports.showAlert = exports.showAddToWatch = void 0;
var _storeApi = require("../storeApi");
var _compStore = require("../stores/compStore");
var _ModalDialogType = require("../../constants/ModalDialogType");
const showDescription = exports.showDescription = (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_DESCRIPTION),
  showSettings = exports.showSettings = (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_SETTINGS),
  showPasteTo = exports.showPasteTo = (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_PASTE_TO),
  showZoom = exports.showZoom = (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_ZOOM),
  showReload = exports.showReload = (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_RELOAD),
  showAlert = exports.showAlert = (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_ALERT),
  showAsk = exports.showAsk = (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_ASK),
  showCustomizeExport = exports.showCustomizeExport = (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_CUSTOMIZE_EXPORT),
  showAddToWatch = exports.showAddToWatch = (0, _storeApi.bindTo)(_compStore.showModalDialog, _ModalDialogType.MDT_ADD_TO_WATCH);
//# sourceMappingURL=ComponentActions.js.map