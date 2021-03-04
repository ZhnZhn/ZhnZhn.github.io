"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";

/*
static propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func,
    getWatchGroups: PropTypes.func
  }),
  actionCompleted: PropTypes.string,
  forActionType: PropTypes.string,
  onRename: PropTypes.func,
  onClose: PropTypes.func
}
*/
var ListDeletePane = function ListDeletePane(_ref) {
  var store = _ref.store,
      actionCompleted = _ref.actionCompleted,
      forActionType = _ref.forActionType,
      onDelete = _ref.onDelete,
      msgOnNotSelect = _ref.msgOnNotSelect,
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
      _hClear = (0, _react.useCallback)(function () {
    return setValidationMessages([]);
  }, []),
      _hDelete = (0, _react.useCallback)(function () {
    var _refSelectGroupList$c = _refSelectGroupList.current.getValue(),
        captionGroup = _refSelectGroupList$c.captionGroup,
        captionList = _refSelectGroupList$c.captionList;

    if (captionGroup && captionList) {
      onDelete({
        captionGroup: captionGroup,
        captionList: captionList
      });
    } else {
      var msg = [];

      if (!captionGroup) {
        msg.push(msgOnNotSelect('Group'));
      }

      if (!captionList) {
        msg.push(msgOnNotSelect('List'));
      }

      setValidationMessages(msg);
    }
  }, []),
      _primaryBt = (0, _react.useMemo)(function () {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].Button.Primary, {
      caption: "Delete",
      title: "Delete List",
      onClick: _hDelete
    });
  }, [_hDelete]);

  (0, _useListen["default"])(store, function (actionType, data) {
    if (actionType === actionCompleted) {
      if (data.forActionType === forActionType) {
        _hClear();
      }

      setGroupOptions(store.getWatchGroups());
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].SelectGroupList, {
      ref: _refSelectGroupList,
      store: store,
      groupCaption: "In Group:",
      groupOptions: groupOptions,
      listCaption: "List:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].ValidationMessages, {
      validationMessages: validationMessages
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowButtons, {
      Primary: _primaryBt,
      onClear: _hClear,
      onClose: onClose
    })]
  });
};

var _default = ListDeletePane;
exports["default"] = _default;
//# sourceMappingURL=ListDeletePane.js.map