"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";
var UPDATE = 'a',
    VALIDATION_ERR = 'b',
    _initState = function _initState(store) {
  return {
    groups: store.getWatchGroups,
    errs: []
  };
},
    _crAction = function _crAction(type, payload) {
  return {
    type: type,
    payload: payload
  };
};

var _reducer = function _reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case UPDATE:
      return {
        groups: payload,
        errs: []
      };

    case VALIDATION_ERR:
      return (0, _extends2["default"])({}, state, {
        errs: payload
      });

    default:
      return state;
  }
};

var _useReducer = function _useReducer(store, msgOnNotSelect) {
  var _useReducer2 = (0, _react.useReducer)(_reducer, store, _initState),
      _useReducer2$ = _useReducer2[0],
      groups = _useReducer2$.groups,
      errs = _useReducer2$.errs,
      dispatch = _useReducer2[1];

  return [groups, errs, function (groups) {
    return dispatch(_crAction(UPDATE, groups));
  }, function () {
    return dispatch(_crAction(VALIDATION_ERR, [msgOnNotSelect('Group')]));
  }];
};

var _usePrimaryBt = function _usePrimaryBt(refCaption, onDelete, setErrs) {
  var _hDeleteGroup = function _hDeleteGroup() {
    var current = refCaption.current;

    if (current) {
      onDelete({
        caption: current
      });
      refCaption.current = null;
    } else {
      setErrs();
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].Button.Primary, {
    caption: "Delete",
    title: "Delete Group",
    onClick: _hDeleteGroup
  });
};

var GroupDeletePane = function GroupDeletePane(_ref2) {
  var store = _ref2.store,
      actionCompleted = _ref2.actionCompleted,
      forActionType = _ref2.forActionType,
      onDelete = _ref2.onDelete,
      msgOnNotSelect = _ref2.msgOnNotSelect,
      onClose = _ref2.onClose;

  var _refCaption = (0, _react.useRef)(null),
      _useReducer3 = _useReducer(store, msgOnNotSelect),
      groups = _useReducer3[0],
      errs = _useReducer3[1],
      updateGroups = _useReducer3[2],
      setErrs = _useReducer3[3],
      _primaryBt = _usePrimaryBt(_refCaption, onDelete, setErrs),
      _hSelectGroup = function _hSelectGroup(item) {
    _refCaption.current = item && item.caption || null;
  };

  (0, _useListen["default"])(store, function (actionType, data) {
    if (actionType === actionCompleted) {
      updateGroups(store.getWatchGroups());
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowInputSelect, {
      caption: "Group:",
      options: groups,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].ValidationMessages, {
      validationMessages: errs
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowButtons, {
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
exports["default"] = _default;
//# sourceMappingURL=GroupDeletePane.js.map