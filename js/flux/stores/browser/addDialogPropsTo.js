"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crSelectProps = _interopRequireDefault(require("./crSelectProps"));

var _assign = Object.assign;

var _crInitialProps = function _crInitialProps(addProps, items) {
  var initialProps = {},
      _config = items[addProps],
      _extends = _config["extends"];

  if (typeof _extends === 'string') {
    _assign(initialProps, items[_extends].dialogProps);
  } else if (Array.isArray(_extends)) {
    _extends.forEach(function (id) {
      _assign(initialProps, items[id].dialogProps);
    });
  }

  return _assign(initialProps, _config.dialogProps);
};

var addDialogPropsTo = function addDialogPropsTo(items) {
  Object.keys(items).forEach(function (propName) {
    var item = items[propName],
        addProps = item.addProps;

    if (addProps !== undefined) {
      var dialogProps = item.dialogProps,
          initialProps = _crInitialProps(addProps, items),
          _selectProps = (0, _crSelectProps["default"])(initialProps, dialogProps);

      item.dialogProps = _assign({}, initialProps, dialogProps, _selectProps);
    }
  });
};

var _default = addDialogPropsTo;
exports["default"] = _default;
//# sourceMappingURL=addDialogPropsTo.js.map