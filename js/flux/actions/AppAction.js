'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showErrDialog = exports.showCustomizeExportDialog = undefined;

var _ComponentActions = require('./ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showCustomizeExportDialog = exports.showCustomizeExportDialog = _ComponentActions2.default.showModalDialog.bind(null, _Type.ModalDialog.CUSTOMIZE_EXPORT);

var showErrDialog = exports.showErrDialog = function showErrDialog(msg, caption) {
  _ComponentActions2.default.showModalDialog(_Type.ModalDialog.ALERT, {
    alertDescr: msg,
    alertCaption: caption
  });
};
//# sourceMappingURL=AppAction.js.map