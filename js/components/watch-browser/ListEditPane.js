"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _useInputText = _interopRequireDefault(require("./hooks/useInputText"));
var _Atoms = _interopRequireDefault(require("./Atoms"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const ListEditPane = _ref => {
  let {
    store,
    onRename,
    msgOnIsEmptyName,
    msgOnNotSelect,
    actionCompleted,
    actionFailed,
    forActionType,
    onClose
  } = _ref;
  const [groupOptions, setGroupOptions] = (0, _uiApi.useState)(() => store.getWatchGroups()),
    [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
    _refSelectGroupList = (0, _uiApi.useRef)(),
    [_refInputText, _hClear] = (0, _useInputText.default)(setValidationMessages)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hRename = (0, _uiApi.useCallback)(() => {
      const {
          captionGroup,
          captionList
        } = (0, _uiApi.getInputValue)(_refSelectGroupList) || {},
        captionListTo = (0, _uiApi.getInputValue)(_refInputText);
      if (captionGroup && captionList && captionListTo) {
        onRename({
          captionGroup,
          captionListFrom: captionList,
          captionListTo
        });
      } else {
        const msg = [];
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
    }, [])
    //onRename, msgOnNotSelect, msgOnIsEmptyName
    /*eslint-enable react-hooks/exhaustive-deps */,
    _primaryBt = (0, _uiApi.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.Button.Primary, {
      caption: "Edit",
      title: "Edit List Name",
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.SelectGroupList, {
      ref: _refSelectGroupList,
      store: store,
      groupCaption: "In Group:",
      groupOptions: groupOptions,
      listCaption: "List From:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowInputText, {
      ref: _refInputText,
      caption: "List To:"
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
exports.default = _default;
//# sourceMappingURL=ListEditPane.js.map