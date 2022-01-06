"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const ListDeletePane = _ref => {
  let {
    store,
    actionCompleted,
    forActionType,
    onDelete,
    msgOnNotSelect,
    onClose
  } = _ref;

  const [groupOptions, setGroupOptions] = (0, _react.useState)(() => store.getWatchGroups()),
        [validationMessages, setValidationMessages] = (0, _react.useState)([]),
        _refSelectGroupList = (0, _react.useRef)(),
        _hClear = (0, _react.useCallback)(() => setValidationMessages([]), [])
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hDelete = (0, _react.useCallback)(() => {
    const {
      captionGroup,
      captionList
    } = _refSelectGroupList.current.getValue();

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
  }, []) //onDelete. msgOnNotSelect

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _primaryBt = (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.Button.Primary, {
    caption: "Delete",
    title: "Delete List",
    onClick: _hDelete
  }), [_hDelete]);

  (0, _useListen.default)((actionType, data) => {
    if (actionType === actionCompleted) {
      if (data.forActionType === forActionType) {
        _hClear();
      }

      setGroupOptions(store.getWatchGroups());
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.SelectGroupList, {
      ref: _refSelectGroupList,
      store: store,
      groupCaption: "In Group:",
      groupOptions: groupOptions,
      listCaption: "List:"
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
ListDeletePane.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func,
    getWatchGroups: PropTypes.func
  }),
  actionCompleted: PropTypes.string,
  forActionType: PropTypes.string,
  msgOnNotSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func
}
*/


var _default = ListDeletePane;
exports.default = _default;
//# sourceMappingURL=ListDeletePane.js.map