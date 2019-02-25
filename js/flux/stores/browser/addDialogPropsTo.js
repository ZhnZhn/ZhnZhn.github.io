'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crSelectProps = require('./crSelectProps');

var _crSelectProps2 = _interopRequireDefault(_crSelectProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addDialogPropsTo = function addDialogPropsTo(items) {
  Object.keys(items).forEach(function (propName) {
    var item = items[propName],
        addProps = item.addProps;
    if (addProps !== undefined) {
      var dialogProps = item.dialogProps,
          baseProps = items[addProps].dialogProps,
          _selectProps = (0, _crSelectProps2.default)(baseProps, dialogProps);
      item.dialogProps = Object.assign({}, baseProps, dialogProps, _selectProps);
    }
  });
};

exports.default = addDialogPropsTo;
//# sourceMappingURL=addDialogPropsTo.js.map