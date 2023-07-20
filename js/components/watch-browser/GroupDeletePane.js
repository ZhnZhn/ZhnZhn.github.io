"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _Atoms = _interopRequireDefault(require("./Atoms"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const UPDATE = 'a',
  VALIDATION_ERR = 'b',
  _initState = store => ({
    groups: store.getWatchGroups,
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
const _useReducer = (store, msgOnNotSelect) => {
  const [{
    groups,
    errs
  }, dispatch] = (0, _uiApi.useReducer)(_reducer, store, _initState);
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
const GroupDeletePane = _ref2 => {
  let {
    store,
    actionCompleted,
    forActionType,
    onDelete,
    msgOnNotSelect,
    onClose
  } = _ref2;
  const _refCaption = (0, _uiApi.useRef)(null),
    [groups, errs, updateGroups, setErrs] = _useReducer(store, msgOnNotSelect),
    _primaryBt = _usePrimaryBt(_refCaption, onDelete, setErrs),
    _hSelectGroup = item => {
      (0, _uiApi.setRefValue)(_refCaption, item && item.caption || null);
    };
  (0, _useListen.default)((actionType, data) => {
    if (actionType === actionCompleted) {
      updateGroups(store.getWatchGroups());
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
      Primary: _primaryBt,
      withoutClear: true,
      onClose: onClose
    })]
  });
};

/*
GroupDeletePane.propTypes = {
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
var _default = GroupDeletePane;
exports.default = _default;
//# sourceMappingURL=GroupDeletePane.js.map