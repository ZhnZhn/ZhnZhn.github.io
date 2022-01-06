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
const GroupEditPane = _ref => {
  let {
    store,
    actionCompleted,
    actionFailed,
    forActionType,
    onRename,
    msgOnNotSelect,
    msgOnIsEmptyName,
    onClose
  } = _ref;

  const [groupOptions, setGroupOptions] = (0, _react.useState)(() => store.getWatchGroups()),
        [validationMessages, setValidationMessages] = (0, _react.useState)([]),
        [_refInputText, _hClear] = (0, _useInputText.default)(setValidationMessages),
        [_refCaptionFrom, _hSelectGroup] = (0, _useSelectItem.default)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hRename = (0, _react.useCallback)(() => {
    const captionTo = _refInputText.current.getValue(),
          captionFrom = _refCaptionFrom.current;

    if (captionTo && captionFrom) {
      onRename({
        captionFrom,
        captionTo
      });
    } else {
      const msg = [];

      if (!captionFrom) {
        msg.push(msgOnNotSelect('Group From'));
      }

      if (!captionTo) {
        msg.push(msgOnIsEmptyName('Group To'));
      }

      setValidationMessages(msg);
    }
  }, []) //onRename, msgOnNotSelect, msgOnIsEmptyName

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _primaryBt = (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.Button.Primary, {
    caption: "Edit",
    title: "Edit Group Name",
    onClick: _hRename
  }), [_hRename]);

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
      caption: "Group From:",
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowInputText, {
      ref: _refInputText,
      caption: "Group To:"
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
GroupEditPane.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func,
    getWatchGroups: PropTypes.func
  }),
  actionCompleted: PropTypes.string,
  actionFailed: PropTypes.string,
  forActionType: PropTypes.string,

  msgOnIsEmptyName: PropTypes.func,
  msgOnNotSelect: PropTypes.func,
  onRename: PropTypes.func,

  onClose: PropTypes.func
}
*/


var _default = GroupEditPane;
exports.default = _default;
//# sourceMappingURL=GroupEditPane.js.map