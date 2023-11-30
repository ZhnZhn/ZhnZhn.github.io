"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useSelectItem = _interopRequireDefault(require("./hooks/useSelectItem"));
var _useInputText = _interopRequireDefault(require("./hooks/useInputText"));
var _useGroupOptions = _interopRequireDefault(require("./hooks/useGroupOptions"));
var _Atoms = _interopRequireDefault(require("./Atoms"));
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
    [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
    [_refInputText, _hClear] = (0, _useInputText.default)(setValidationMessages),
    groupOptions = (0, _useGroupOptions.default)(props, setValidationMessages, _hClear),
    [_refCaptionGroup, _hSelectGroup] = (0, _useSelectItem.default)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hCreate = (0, _uiApi.useCallback)(() => {
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
    }, [])
    //onCreate, msgOnNotSelect, msgOnIsEmptyName
    /*eslint-enable react-hooks/exhaustive-deps */,
    _primaryBt = (0, _uiApi.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.Button.Primary, {
      caption: "Create",
      title: "Create New List",
      onClick: _hCreate
    }), [_hCreate]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowInputSelect, {
      caption: "In Group:",
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowInputText, {
      ref: _refInputText,
      caption: "List:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.ValidationMessages, {
      validationMessages: validationMessages
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowButtons, {
      refBtClose: (0, _paneFn.getRefFocusLast)(props),
      Primary: _primaryBt,
      onClear: _hClear,
      onClose: onClose
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