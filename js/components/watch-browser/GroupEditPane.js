"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useSelectItem = _interopRequireDefault(require("./hooks/useSelectItem"));
var _useValidationMessages = _interopRequireDefault(require("./hooks/useValidationMessages"));
var _useGroupOptions = _interopRequireDefault(require("./hooks/useGroupOptions"));
var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));
var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));
var _RowInputText = _interopRequireDefault(require("./RowInputText"));
var _RowButtons = _interopRequireDefault(require("./RowButtons"));
var _paneFn = require("./paneFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const GroupEditPane = props => {
  const {
      msgOnNotSelect,
      msgOnIsEmptyName,
      onRename,
      onClose
    } = props,
    [validationMessages, setValidationMessages, _hClear, _refInputText] = (0, _useValidationMessages.default)(),
    groupOptions = (0, _useGroupOptions.default)(props, setValidationMessages, _hClear),
    [_refCaptionFrom, _hSelectGroup] = (0, _useSelectItem.default)(),
    _hRename = () => {
      const captionTo = (0, _uiApi.getInputValue)(_refInputText),
        captionFrom = (0, _uiApi.getRefValue)(_refCaptionFrom);
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
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      caption: "Group From:",
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputText.default, {
      refEl: _refInputText,
      caption: "Group To:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages.default, {
      validationMessages: validationMessages
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowButtons.default, {
      refBtClose: (0, _paneFn.getRefFocusLast)(props),
      caption: "Edit",
      title: "Edit Group Name",
      onPrimary: _hRename,
      onClear: _hClear,
      onClose: onClose
    })]
  });
};

/*
GroupEditPane.propTypes = {
  getWatchGroups: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.func,

  msgOnIsEmptyName: PropTypes.func,
  msgOnNotSelect: PropTypes.func,
  onRename: PropTypes.func,

  onClose: PropTypes.func
}
*/
var _default = exports.default = GroupEditPane;
//# sourceMappingURL=GroupEditPane.js.map