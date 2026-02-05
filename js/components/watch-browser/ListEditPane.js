"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useValidationMessages = _interopRequireDefault(require("./hooks/useValidationMessages"));
var _useGroupOptions = _interopRequireDefault(require("./hooks/useGroupOptions"));
var _WatchPane = _interopRequireDefault(require("./WatchPane"));
var _SelectGroupList = _interopRequireDefault(require("./SelectGroupList"));
var _RowInputText = _interopRequireDefault(require("./RowInputText"));
var _paneFn = require("./paneFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const ListEditPane = props => {
  const {
      onRename,
      msgOnIsEmptyName,
      msgOnNotSelect,
      getWatchListsByGroup,
      onClose
    } = props,
    _refSelectGroupList = (0, _uiApi.useRef)(),
    [validationMessages, setValidationMessages, _hClear, _refInputText] = (0, _useValidationMessages.default)(),
    groupOptions = (0, _useGroupOptions.default)(props, setValidationMessages, _hClear),
    _hRename = () => {
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
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_WatchPane.default, {
    validationMessages: validationMessages,
    refBtClose: (0, _paneFn.getRefFocusLast)(props),
    caption: "Edit",
    title: "Edit List Name",
    onPrimary: _hRename,
    onClear: _hClear,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectGroupList.default, {
      refEl: _refSelectGroupList,
      getWatchListsByGroup: getWatchListsByGroup,
      groupCaption: "In Group",
      groupOptions: groupOptions,
      listCaption: "List From"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputText.default, {
      refEl: _refInputText,
      caption: "List To"
    })]
  });
};

/*
ListEditPane.propTypes = {
  getWatchGroups: PropTypes.func,
  getWatchListsByGroup: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.string,

  msgOnIsEmptyName: PropTypes.func,
  msgOnNotSelect: PropTypes.func,
  onRename: PropTypes.func,

  onClose: PropTypes.func
}
*/
var _default = exports.default = ListEditPane;
//# sourceMappingURL=ListEditPane.js.map