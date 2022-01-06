"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const _usePrimaryBt = (refInput, setState, onCreate, msgOnIsEmptyName) => {
  const _hCreate = () => {
    const caption = refInput.current.getValue();

    if (caption) {
      onCreate({
        caption
      });
    } else {
      refInput.current.setValue('');
      setState([msgOnIsEmptyName('Group')]);
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.Button.Primary, {
    caption: "Create",
    title: "Create New Group",
    onClick: _hCreate
  });
};

const GroupAddPane = _ref => {
  let {
    //store,
    actionCompleted,
    actionFailed,
    forActionType,
    onCreate,
    msgOnIsEmptyName,
    onClose
  } = _ref;

  const _refInput = (0, _react.useRef)(),
        [validationMessages, setState] = (0, _react.useState)([]),
        _primaryBt = _usePrimaryBt(_refInput, setState, onCreate, msgOnIsEmptyName),
        _hClear = () => {
    _refInput.current.setValue('');

    setState([]);
  };

  (0, _useListen.default)((actionType, data) => {
    if (actionType === actionCompleted && data.forActionType === forActionType) {
      _hClear();
    } else if (actionType === actionFailed && data.forActionType === forActionType) {
      setState(data.messages);
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowInputText, {
      ref: _refInput,
      caption: "Group:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.ValidationMessages, {
      validationMessages: validationMessages
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowButtons, {
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
exports.default = _default;
//# sourceMappingURL=GroupAddPane.js.map