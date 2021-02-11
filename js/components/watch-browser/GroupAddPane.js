"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";
var _usePrimaryBt = function _usePrimaryBt(refInput, setState, onCreate, msgOnIsEmptyName) {
  var _hCreate = function _hCreate() {
    var caption = refInput.current.getValue();

    if (caption) {
      onCreate({
        caption: caption
      });
    } else {
      refInput.current.setValue('');
      setState([msgOnIsEmptyName('Group')]);
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].Button.Primary, {
    caption: "Create",
    title: "Create New Group",
    onClick: _hCreate
  });
};

var GroupAddPane = function GroupAddPane(_ref) {
  var store = _ref.store,
      actionCompleted = _ref.actionCompleted,
      actionFailed = _ref.actionFailed,
      forActionType = _ref.forActionType,
      onCreate = _ref.onCreate,
      msgOnIsEmptyName = _ref.msgOnIsEmptyName,
      onClose = _ref.onClose;

  var _refInput = (0, _react.useRef)(),
      _useState = (0, _react.useState)([]),
      validationMessages = _useState[0],
      setState = _useState[1],
      _primaryBt = _usePrimaryBt(_refInput, setState, onCreate, msgOnIsEmptyName),
      _hClear = function _hClear() {
    _refInput.current.setValue('');

    setState([]);
  };

  (0, _useListen["default"])(store, function (actionType, data) {
    if (actionType === actionCompleted && data.forActionType === forActionType) {
      _hClear();
    } else if (actionType === actionFailed && data.forActionType === forActionType) {
      setState(data.messages);
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowInputText, {
      ref: _refInput,
      caption: "Group:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].ValidationMessages, {
      validationMessages: validationMessages
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowButtons, {
      Primary: _primaryBt,
      onClear: _hClear,
      onClose: onClose
    })]
  });
};
/*
GroupAddPane.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func
  }),
  actionCompleted: PropTypes.string,
  actionFailed: PropTypes.string,
  forActionType: PropTypes.string,
  msgOnIsEmptyName: PropTypes.func,
  onCreate: PropTypes.func,
  onClose: PropTypes.func
}
*/


var _default = GroupAddPane;
exports["default"] = _default;
//# sourceMappingURL=GroupAddPane.js.map