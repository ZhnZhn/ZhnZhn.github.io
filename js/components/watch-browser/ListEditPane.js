"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _useInputText2 = _interopRequireDefault(require("./hooks/useInputText"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";
var ListEditPane = function ListEditPane(_ref) {
  var store = _ref.store,
      onRename = _ref.onRename,
      msgOnIsEmptyName = _ref.msgOnIsEmptyName,
      msgOnNotSelect = _ref.msgOnNotSelect,
      actionCompleted = _ref.actionCompleted,
      actionFailed = _ref.actionFailed,
      forActionType = _ref.forActionType,
      onClose = _ref.onClose;

  var _useState = (0, _react.useState)(function () {
    return store.getWatchGroups();
  }),
      groupOptions = _useState[0],
      setGroupOptions = _useState[1],
      _useState2 = (0, _react.useState)([]),
      validationMessages = _useState2[0],
      setValidationMessages = _useState2[1],
      _refSelectGroupList = (0, _react.useRef)(),
      _useInputText = (0, _useInputText2["default"])(setValidationMessages),
      _refInputText = _useInputText[0],
      _hClear = _useInputText[1],
      _hRename = (0, _react.useCallback)(function () {
    var _refSelectGroupList$c = _refSelectGroupList.current.getValue(),
        captionGroup = _refSelectGroupList$c.captionGroup,
        captionList = _refSelectGroupList$c.captionList,
        captionListTo = _refInputText.current.getValue();

    if (captionGroup && captionList && captionListTo) {
      onRename({
        captionGroup: captionGroup,
        captionListFrom: captionList,
        captionListTo: captionListTo
      });
    } else {
      var msg = [];

      if (!captionGroup) {
        msg.push(msgOnNotSelect('Group'));
      }

      if (!captionList) {
        msg.push(msgOnNotSelect('List From'));
      }

      if (!captionListTo) {
        msg.push(msgOnIsEmptyName('List To'));
      }

      setValidationMessages(msg);
    }
  }, []),
      _primaryBt = (0, _react.useMemo)(function () {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].Button.Primary, {
      caption: "Edit",
      title: "Edit List Name",
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].SelectGroupList, {
      ref: _refSelectGroupList,
      store: store,
      groupCaption: "In Group:",
      groupOptions: groupOptions,
      listCaption: "List From:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowInputText, {
      ref: _refInputText,
      caption: "List To:"
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
ListEditPane.propTypes = {
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


var _default = ListEditPane;
exports["default"] = _default;
//# sourceMappingURL=ListEditPane.js.map