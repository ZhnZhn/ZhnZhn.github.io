"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _WatchPane = _interopRequireDefault(require("./WatchPane"));
var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));
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
    _hDeleteGroup = () => {
      const caption = (0, _uiApi.getRefValue)(_refCaption);
      if (caption) {
        onDelete({
          caption
        });
        (0, _uiApi.setRefValue)(_refCaption, null);
      } else {
        setErrs();
      }
    },
    _hSelectGroup = item => {
      (0, _uiApi.setRefValue)(_refCaption, item && item.caption || null);
    };
  useMsEdit(msEdit => {
    if (msEdit && !msEdit.messages) {
      updateGroups(getWatchGroups());
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WatchPane.default, {
    validationMessages: errs,
    refBtClose: (0, _paneFn.getRefFocusLast)(props),
    caption: "Delete",
    title: "Delete Group",
    onPrimary: _hDeleteGroup,
    withoutClear: true,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      caption: "Group",
      options: groups,
      onSelect: _hSelectGroup
    })
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