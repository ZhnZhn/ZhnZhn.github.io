'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LoadItemDialog = require('./LoadItemDialog');

var _LoadItemDialog2 = _interopRequireDefault(_LoadItemDialog);

var _EditGroupDialog = require('./EditGroupDialog');

var _EditGroupDialog2 = _interopRequireDefault(_EditGroupDialog);

var _EditListDialog = require('./EditListDialog');

var _EditListDialog2 = _interopRequireDefault(_EditListDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalDialogs = {
  LoadItem: _LoadItemDialog2.default,
  EditGroup: _EditGroupDialog2.default,
  EditList: _EditListDialog2.default
};

exports.default = ModalDialogs;
//# sourceMappingURL=ModalDialogs.js.map