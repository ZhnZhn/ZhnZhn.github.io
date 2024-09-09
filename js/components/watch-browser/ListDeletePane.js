"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useValidationMessages = _interopRequireDefault(require("./hooks/useValidationMessages"));
var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));
var _SelectGroupList = _interopRequireDefault(require("./SelectGroupList"));
var _RowButtons = _interopRequireDefault(require("./RowButtons"));
var _paneFn = require("./paneFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const ListDeletePane = props => {
  const {
      getWatchListsByGroup,
      useMsEdit,
      getWatchGroups,
      forActionType,
      onDelete,
      msgOnNotSelect,
      onClose
    } = props,
    _refSelectGroupList = (0, _uiApi.useRef)(),
    [validationMessages, setValidationMessages, _hClear] = (0, _useValidationMessages.default)(),
    [groupOptions, setGroupOptions] = (0, _uiApi.useState)(() => getWatchGroups())
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hDelete = () => {
      const {
        captionGroup,
        captionList
      } = (0, _uiApi.getInputValue)(_refSelectGroupList) || {};
      if (captionGroup && captionList) {
        onDelete({
          captionGroup,
          captionList
        });
      } else {
        const msg = [];
        if (!captionGroup) {
          msg.push(msgOnNotSelect('Group'));
        }
        if (!captionList) {
          msg.push(msgOnNotSelect('List'));
        }
        setValidationMessages(msg);
      }
    };
  useMsEdit(msEdit => {
    if (msEdit) {
      if (!msEdit.messages) {
        if (msEdit.forActionType === forActionType) {
          _hClear();
        }
        setGroupOptions(getWatchGroups());
      }
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectGroupList.default, {
      refEl: _refSelectGroupList,
      getWatchListsByGroup: getWatchListsByGroup,
      groupCaption: "In Group:",
      groupOptions: groupOptions,
      listCaption: "List:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages.default, {
      validationMessages: validationMessages
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowButtons.default, {
      refBtClose: (0, _paneFn.getRefFocusLast)(props),
      caption: "Delete",
      title: "Delete List",
      onPrimary: _hDelete,
      onClear: _hClear,
      onClose: onClose
    })]
  });
};

/*
ListDeletePane.propTypes = {
  getWatchGroups: PropTypes.func,
  getWatchListsByGroup: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.func,

  msgOnNotSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func
}
*/
var _default = exports.default = ListDeletePane;
//# sourceMappingURL=ListDeletePane.js.map