"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useValidationMessages = _interopRequireDefault(require("./hooks/useValidationMessages"));
var _WatchPane = _interopRequireDefault(require("./WatchPane"));
var _RowInputText = _interopRequireDefault(require("./RowInputText"));
var _paneFn = require("./paneFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const GroupAddPane = props => {
  const {
      forActionType,
      useMsEdit,
      msgOnIsEmptyName,
      onCreate,
      onClose
    } = props,
    [validationMessages, setValidationMessages, clearInput, refInput] = (0, _useValidationMessages.default)(),
    _hCreate = () => {
      const caption = (0, _uiApi.getInputValue)(refInput);
      if (caption) {
        onCreate({
          caption
        });
      } else {
        (0, _uiApi.clearInputValue)(refInput);
        setValidationMessages([msgOnIsEmptyName('Group')]);
      }
    };
  useMsEdit(msEdit => {
    if (msEdit) {
      if (msEdit.forActionType === forActionType) {
        if (msEdit.messages) {
          setValidationMessages(msEdit.messages);
        } else {
          clearInput();
        }
      }
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WatchPane.default, {
    validationMessages: validationMessages,
    refBtClose: (0, _paneFn.getRefFocusLast)(props),
    caption: "Create",
    title: "Create New Group",
    onPrimary: _hCreate,
    onClear: clearInput,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputText.default, {
      refEl: refInput,
      caption: "Group"
    })
  });
};

/*
GroupAddPane.propTypes = {
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.func,

  msgOnIsEmptyName: PropTypes.func,
  onCreate: PropTypes.func,
  onClose: PropTypes.func
}
*/
var _default = exports.default = GroupAddPane;
//# sourceMappingURL=GroupAddPane.js.map