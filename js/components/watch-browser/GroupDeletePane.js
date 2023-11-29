"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _Atoms = _interopRequireDefault(require("./Atoms"));
var _paneFn = require("./paneFn");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const UPDATE = 'a',
  VALIDATION_ERR = 'b',
  _initState = getWatchGroups => ({
    groups: getWatchGroups(),
    errs: []
  }),
  _crAction = (type, payload) => ({
    type,
    payload
  });
const _reducer = (state, _ref) => {
  let {
    type,
    payload
  } = _ref;
  switch (type) {
    case UPDATE:
      return {
        groups: payload,
        errs: []
      };
    case VALIDATION_ERR:
      return {
        ...state,
        errs: payload
      };
    default:
      return state;
  }
};
const _useReducer = (getWatchGroups, msgOnNotSelect) => {
  const [{
    groups,
    errs
  }, dispatch] = (0, _uiApi.useReducer)(_reducer, getWatchGroups, _initState);
  return [groups, errs, groups => dispatch(_crAction(UPDATE, groups)), () => dispatch(_crAction(VALIDATION_ERR, [msgOnNotSelect('Group')]))];
};
const _usePrimaryBt = (refCaption, onDelete, setErrs) => {
  const _hDeleteGroup = () => {
    const caption = (0, _uiApi.getRefValue)(refCaption);
    if (caption) {
      onDelete({
        caption
      });
      (0, _uiApi.setRefValue)(refCaption, null);
    } else {
      setErrs();
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.Button.Primary, {
    caption: "Delete",
    title: "Delete Group",
    onClick: _hDeleteGroup
  });
};
const GroupDeletePane = props => {
  const {
      onDelete,
      msgOnNotSelect,
      useMsEdit,
      getWatchGroups,
      onClose
    } = props,
    _refCaption = (0, _uiApi.useRef)(null),
    [groups, errs, updateGroups, setErrs] = _useReducer(getWatchGroups, msgOnNotSelect),
    _primaryBt = _usePrimaryBt(_refCaption, onDelete, setErrs),
    _hSelectGroup = item => {
      (0, _uiApi.setRefValue)(_refCaption, item && item.caption || null);
    };
  useMsEdit(msEdit => {
    if (msEdit && !msEdit.messages) {
      updateGroups(getWatchGroups());
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowInputSelect, {
      caption: "Group:",
      options: groups,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.ValidationMessages, {
      validationMessages: errs
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms.default.RowButtons, {
      refBtClose: (0, _paneFn.getRefFocusLast)(props),
      Primary: _primaryBt,
      withoutClear: true,
      onClose: onClose
    })]
  });
};

/*
GroupDeletePane.propTypes = {
  getWatchGroups: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.func,

  msgOnNotSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func
}
*/
var _default = exports.default = GroupDeletePane;
//# sourceMappingURL=GroupDeletePane.js.map