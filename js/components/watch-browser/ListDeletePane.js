"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _Atoms = _interopRequireDefault(require("./Atoms"));
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
    [groupOptions, setGroupOptions] = (0, _uiApi.useState)(() => getWatchGroups()),
    [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
    _refSelectGroupList = (0, _uiApi.useRef)(),
    _hClear = (0, _uiApi.useCallback)(() => setValidationMessages([]), [])
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hDelete = (0, _uiApi.useCallback)(() => {
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
    }, [])
    //onDelete. msgOnNotSelect
    /*eslint-enable react-hooks/exhaustive-deps */,
    _primaryBt = (0, _uiApi.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.Button.Primary, {
      caption: "Delete",
      title: "Delete List",
      onClick: _hDelete
    }), [_hDelete]);
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.SelectGroupList, {
      ref: _refSelectGroupList,
      getWatchListsByGroup: getWatchListsByGroup,
      groupCaption: "In Group:",
      groupOptions: groupOptions,
      listCaption: "List:"
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