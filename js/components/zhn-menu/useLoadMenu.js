"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = require("react");

var LOADING = 'a',
    LOADED = 'b',
    FAILED = 'c',
    UPDATE = 'd',
    _crAction = function _crAction(type, menu) {
  return {
    type: type,
    menu: menu
  };
},
    initialState = {
  isLoaded: false,
  isLoading: false,
  menu: []
};

var _reducer = function _reducer(state, _ref) {
  var type = _ref.type,
      menu = _ref.menu;

  switch (type) {
    case LOADING:
      return (0, _extends2["default"])({}, state, {
        isLoading: true
      });

    case LOADED:
      return {
        isLoading: false,
        isLoaded: true,
        menu: menu
      };

    case FAILED:
      return (0, _extends2["default"])({}, initialState);

    case UPDATE:
      return (0, _extends2["default"])({}, state, {
        menu: menu
      });

    default:
      return state;
  }
};

var useLoadMenu = function useLoadMenu() {
  var _useReducer = (0, _react.useReducer)(_reducer, initialState),
      _useReducer$ = _useReducer[0],
      isLoading = _useReducer$.isLoading,
      isLoaded = _useReducer$.isLoaded,
      menu = _useReducer$.menu,
      dispatch = _useReducer[1],
      setLoading = function setLoading() {
    return dispatch(_crAction(LOADING));
  },
      setFailed = function setFailed() {
    return dispatch(_crAction(FAILED));
  },
      setLoaded = function setLoaded(menu) {
    return dispatch(_crAction(LOADED, menu));
  },
      updateMenu = function updateMenu(menu) {
    return dispatch(_crAction(UPDATE, menu));
  };

  return [isLoading, isLoaded, menu, setLoading, setLoaded, setFailed, updateMenu];
};

var _default = useLoadMenu;
exports["default"] = _default;
//# sourceMappingURL=useLoadMenu.js.map