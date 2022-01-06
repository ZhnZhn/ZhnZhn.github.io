"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _useSelectItem = _interopRequireDefault(require("./hooks/useSelectItem"));

var _useInputText = _interopRequireDefault(require("./hooks/useInputText"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const ListCreatePane = _ref => {
  let {
    store,
    onCreate,
    msgOnNotSelect,
    msgOnIsEmptyName,
    actionCompleted,
    actionFailed,
    forActionType,
    onClose
  } = _ref;

  const [groupOptions, setGroupOptions] = (0, _react.useState)(() => store.getWatchGroups()),
        [validationMessages, setValidationMessages] = (0, _react.useState)([]),
        [_refInputText, _hClear] = (0, _useInputText.default)(setValidationMessages),
        [_refCaptionGroup, _hSelectGroup] = (0, _useSelectItem.default)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hCreate = (0, _react.useCallback)(() => {
    const captionList = _refInputText.current.getValue(),
          captionGroup = _refCaptionGroup.current;

    if (captionGroup && captionList) {
      onCreate({
        captionGroup,
        captionList
      });
    } else {
      const msg = [];

      if (!captionGroup) {
        msg.push(msgOnNotSelect('In Group'));
      }

      if (!captionList) {
        msg.push(msgOnIsEmptyName('List'));
      }

      setValidationMessages(msg);
    }
  }, []) //onCreate, msgOnNotSelect, msgOnIsEmptyName

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _primaryBt = (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.Button.Primary, {
    caption: "Create",
    title: "Create New List",
    onClick: _hCreate
  }), [_hCreate]);

  (0, _useListen.default)((actionType, data) => {
    if (actionType === actionCompleted) {
      if (data.forActionType === forActionType) {
        _hClear();
      }

      setGroupOptions(store.getWatchGroups());
    } else if (actionType === actionFailed && data.forActionType === forActionType) {
      setValidationMessages(data.messages);
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowInputSelect, {
      caption: "In Group:",
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowInputText, {
      ref: _refInputText,
      caption: "List:"
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
ListCreatePane.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func,
    getWatchGroups: PropTypes.func
  }),
  actionCompleted: PropTypes.string,
  actionFailed: PropTypes.string,
  forActionType: PropTypes.string,

  msgOnNotSelect: PropTypes.func,
  msgOnIsEmptyName: PropTypes.func,
  onCreate: PropTypes.func,

  onClose: PropTypes.func
}
*/


var _default = ListCreatePane;
exports.default = _default;
//# sourceMappingURL=ListCreatePane.js.map