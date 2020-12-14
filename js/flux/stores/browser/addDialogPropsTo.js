"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAddProps = _interopRequireDefault(require("./crAddProps"));

var _crSelectProps = _interopRequireDefault(require("./crSelectProps"));

var _assign = Object.assign,
    _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
};

var addDialogPropsTo = function addDialogPropsTo(items) {
  Object.keys(items).forEach(function (pnId) {
    var item = items[pnId],
        addPropsId = item.addProps;

    if (!_isUndef(addPropsId)) {
      var dialogProps = item.dialogProps,
          addProps = (0, _crAddProps["default"])(items, addPropsId),
          _selectProps = (0, _crSelectProps["default"])(addProps, dialogProps);

      item.dialogProps = _assign({}, addProps, dialogProps, _selectProps);
      item.dialogProps.dfProps = _assign({}, addProps.dfProps, dialogProps.dfProps);
    }
  });
};

var _default = addDialogPropsTo;
exports["default"] = _default;
//# sourceMappingURL=addDialogPropsTo.js.map