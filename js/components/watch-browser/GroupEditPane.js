"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _useSelectItem2 = _interopRequireDefault(require("./hooks/useSelectItem"));

var _useInputText2 = _interopRequireDefault(require("./hooks/useInputText"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";
var GroupEditPane = function GroupEditPane(_ref) {
  var store = _ref.store,
      actionCompleted = _ref.actionCompleted,
      actionFailed = _ref.actionFailed,
      forActionType = _ref.forActionType,
      onRename = _ref.onRename,
      msgOnNotSelect = _ref.msgOnNotSelect,
      msgOnIsEmptyName = _ref.msgOnIsEmptyName,
      onClose = _ref.onClose;

  var _useState = (0, _react.useState)(function () {
    return store.getWatchGroups();
  }),
      groupOptions = _useState[0],
      setGroupOptions = _useState[1],
      _useState2 = (0, _react.useState)([]),
      validationMessages = _useState2[0],
      setValidationMessages = _useState2[1],
      _useInputText = (0, _useInputText2["default"])(setValidationMessages),
      _refInputText = _useInputText[0],
      _hClear = _useInputText[1],
      _useSelectItem = (0, _useSelectItem2["default"])(),
      _refCaptionFrom = _useSelectItem[0],
      _hSelectGroup = _useSelectItem[1],
      _hRename = (0, _react.useCallback)(function () {
    var captionTo = _refInputText.current.getValue(),
        captionFrom = _refCaptionFrom.current;

    if (captionTo && captionFrom) {
      onRename({
        captionFrom: captionFrom,
        captionTo: captionTo
      });
    } else {
      var msg = [];

      if (!captionFrom) {
        msg.push(msgOnNotSelect('Group From'));
      }

      if (!captionTo) {
        msg.push(msgOnIsEmptyName('Group To'));
      }

      setValidationMessages(msg);
    }
  }, []),
      _primaryBt = (0, _react.useMemo)(function () {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].Button.Primary, {
      caption: "Edit",
      title: "Edit Group Name",
      onClick: _hRename
    });
  }, [_hRename]);

  (0, _useListen["default"])(store, function (actionType, data) {
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowInputSelect, {
      caption: "Group From:",
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowInputText, {
      ref: _refInputText,
      caption: "Group To:"
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
exports["default"] = _default;
//# sourceMappingURL=GroupEditPane.js.map