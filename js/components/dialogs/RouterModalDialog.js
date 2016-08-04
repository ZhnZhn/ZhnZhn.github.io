'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RouterModalDialog;

var _Type = require('../../constants/Type');

var _InfoDialog = require('./InfoDialog');

var _InfoDialog2 = _interopRequireDefault(_InfoDialog);

var _AlertDialog = require('./AlertDialog');

var _AlertDialog2 = _interopRequireDefault(_AlertDialog);

var _DescriptionDialog = require('./DescriptionDialog');

var _DescriptionDialog2 = _interopRequireDefault(_DescriptionDialog);

var _CustomizeExportDialog = require('./CustomizeExportDialog');

var _CustomizeExportDialog2 = _interopRequireDefault(_CustomizeExportDialog);

var _SettingsDialog = require('../header/SettingsDialog');

var _SettingsDialog2 = _interopRequireDefault(_SettingsDialog);

var _AddToWatchDialog = require('../watch-browser/AddToWatchDialog');

var _AddToWatchDialog2 = _interopRequireDefault(_AddToWatchDialog);

var _LoadItemDialog = require('../watch-browser/LoadItemDialog');

var _LoadItemDialog2 = _interopRequireDefault(_LoadItemDialog);

var _EditGroupDialog = require('../watch-browser/EditGroupDialog');

var _EditGroupDialog2 = _interopRequireDefault(_EditGroupDialog);

var _EditListDialog = require('../watch-browser/EditListDialog');

var _EditListDialog2 = _interopRequireDefault(_EditListDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RouterModalDialog = (_RouterModalDialog = {}, _defineProperty(_RouterModalDialog, _Type.ModalDialog.INFO, _InfoDialog2.default), _defineProperty(_RouterModalDialog, _Type.ModalDialog.ALERT, _AlertDialog2.default), _defineProperty(_RouterModalDialog, _Type.ModalDialog.DESCRIPTION, _DescriptionDialog2.default), _defineProperty(_RouterModalDialog, _Type.ModalDialog.CUSTOMIZE_EXPORT, _CustomizeExportDialog2.default), _defineProperty(_RouterModalDialog, _Type.ModalDialog.SETTINGS, _SettingsDialog2.default), _defineProperty(_RouterModalDialog, _Type.ModalDialog.ADD_TO_WATCH, _AddToWatchDialog2.default), _defineProperty(_RouterModalDialog, _Type.ModalDialog.LOAD_ITEM, _LoadItemDialog2.default), _defineProperty(_RouterModalDialog, _Type.ModalDialog.EDIT_WATCH_GROUP, _EditGroupDialog2.default), _defineProperty(_RouterModalDialog, _Type.ModalDialog.EDIT_WATCH_LIST, _EditListDialog2.default), _RouterModalDialog);

exports.default = RouterModalDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\RouterModalDialog.js.map