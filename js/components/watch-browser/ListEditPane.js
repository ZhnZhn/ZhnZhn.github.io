"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useValidationMessages = _interopRequireDefault(require("./hooks/useValidationMessages"));
var _useGroupOptions = _interopRequireDefault(require("./hooks/useGroupOptions"));
var _Atoms = _interopRequireDefault(require("./Atoms"));
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
    groupOptions = (0, _useGroupOptions.default)(props, setValidationMessages, _hClear)
    /*eslint-disable react-hooks/exhaustive-deps */,
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.SelectGroupList, {
      refEl: _refSelectGroupList,
      getWatchListsByGroup: getWatchListsByGroup,
      groupCaption: "In Group:",
      groupOptions: groupOptions,
      listCaption: "List From:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowInputText, {
      refEl: _refInputText,
      caption: "List To:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.ValidationMessages, {
      validationMessages: validationMessages
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowButtons, {
      refBtClose: (0, _paneFn.getRefFocusLast)(props),
      caption: "Edit",
      title: "Edit List Name",
      onPrimary: _hRename,
      onClear: _hClear,
      onClose: onClose
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