"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useSelectItem = _interopRequireDefault(require("./hooks/useSelectItem"));
var _useValidationMessages = _interopRequireDefault(require("./hooks/useValidationMessages"));
var _useGroupOptions = _interopRequireDefault(require("./hooks/useGroupOptions"));
var _WatchPane = _interopRequireDefault(require("./WatchPane"));
var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));
var _RowInputText = _interopRequireDefault(require("./RowInputText"));
var _paneFn = require("./paneFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const ListCreatePane = props => {
  const {
      msgOnNotSelect,
      msgOnIsEmptyName,
      onCreate,
      onClose
    } = props,
    [validationMessages, setValidationMessages, _hClear, _refInputText] = (0, _useValidationMessages.default)(),
    groupOptions = (0, _useGroupOptions.default)(props, setValidationMessages, _hClear),
    [_refCaptionGroup, _hSelectGroup] = (0, _useSelectItem.default)(),
    _hCreate = () => {
      const captionList = (0, _uiApi.getInputValue)(_refInputText),
        captionGroup = (0, _uiApi.getRefValue)(_refCaptionGroup);
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
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_WatchPane.default, {
    validationMessages: validationMessages,
    refBtClose: (0, _paneFn.getRefFocusLast)(props),
    caption: "Create",
    title: "Create New List",
    onPrimary: _hCreate,
    onClear: _hClear,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      caption: "In Group",
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputText.default, {
      refEl: _refInputText,
      caption: "List"
    })]
  });
};

/*
ListCreatePane.propTypes = {
  getWatchGroups: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: : PropTypes.func,

  msgOnNotSelect: PropTypes.func,
  msgOnIsEmptyName: PropTypes.func,
  onCreate: PropTypes.func,

  onClose: PropTypes.func
}
*/
var _default = exports.default = ListCreatePane;
//# sourceMappingURL=ListCreatePane.js.map