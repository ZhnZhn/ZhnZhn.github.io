"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";
var ListCreatePane = function ListCreatePane(_ref) {
  var store = _ref.store,
      onCreate = _ref.onCreate,
      msgOnNotSelect = _ref.msgOnNotSelect,
      msgOnIsEmptyName = _ref.msgOnIsEmptyName,
      actionCompleted = _ref.actionCompleted,
      actionFailed = _ref.actionFailed,
      forActionType = _ref.forActionType,
      onClose = _ref.onClose;

  var _refInputText = (0, _react.useRef)(),
      _refCaptionGroup = (0, _react.useRef)(),
      _useState = (0, _react.useState)(function () {
    return store.getWatchGroups();
  }),
      groupOptions = _useState[0],
      setGroupOptions = _useState[1],
      _useState2 = (0, _react.useState)([]),
      validationMessages = _useState2[0],
      setValidationMessages = _useState2[1],
      _hCreate = (0, _react.useCallback)(function () {
    var captionList = _refInputText.current.getValue(),
        captionGroup = _refCaptionGroup.current;

    if (captionGroup && captionList) {
      onCreate({
        captionGroup: captionGroup,
        captionList: captionList
      });
    } else {
      var msg = [];

      if (!captionGroup) {
        msg.push(msgOnNotSelect('In Group'));
      }

      if (!captionList) {
        msg.push(msgOnIsEmptyName('List'));
      }

      setValidationMessages(msg);
    }
  }, []),
      _primaryBt = (0, _react.useMemo)(function () {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].Button.Primary, {
      caption: "Create",
      title: "Create New List",
      onClick: _hCreate
    });
  }, [_hCreate]),
      _hSelectGroup = (0, _react.useCallback)(function (item) {
    var _ref2 = item || {},
        caption = _ref2.caption;

    _refCaptionGroup.current = caption;
  }, []),
      _hClear = (0, _react.useCallback)(function () {
    _refInputText.current.setValue('');

    setValidationMessages([]);
  }, []);

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
      caption: "In Group:",
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowInputText, {
      ref: _refInputText,
      caption: "List:"
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
exports["default"] = _default;
//# sourceMappingURL=ListCreatePane.js.map