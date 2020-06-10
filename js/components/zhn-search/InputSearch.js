"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

var _SearchOptions = _interopRequireDefault(require("./SearchOptions"));

var _ToggleButton = _interopRequireDefault(require("./ToggleButton"));

var _initialState = _interopRequireDefault(require("./flux/initialState"));

var _reducer = _interopRequireDefault(require("./flux/reducer"));

var _crAction = _interopRequireDefault(require("./flux/crAction"));

var _crInputChange = _interopRequireDefault(require("./flux/crInputChange"));

var CL = {
  INPUT_HR: 'zhn-search__input__hr'
};
var S = {
  ROOT: {
    position: 'relative',
    width: 250,
    height: 36,
    borderRadius: 14,
    background: 'none 0px 0px repeat scroll rgb(225, 225, 203)'
  },
  ROOT_OPTIONS: {
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  INPUT: {
    display: 'block',
    width: '100%',
    height: 30,
    paddingLeft: 10,
    marginLeft: 0,
    borderRadius: 15,
    boxShadow: 'none'
  }
};

var _isHideOptions = function _isHideOptions(keyCode) {
  return keyCode === 38 || keyCode === 46 || keyCode === 27;
};

var _isShowOptions = function _isShowOptions(keyCode, options) {
  return keyCode === 40 && options.length > 0;
};

var InputSearch = function InputSearch(_ref) {
  var _ref$isSearch = _ref.isSearch,
      isSearch = _ref$isSearch === void 0 ? true : _ref$isSearch,
      searchApi = _ref.searchApi,
      _ref$crInputChange = _ref.crInputChange,
      crInputChange = _ref$crInputChange === void 0 ? _crInputChange["default"] : _ref$crInputChange;

  var refInput = (0, _react.useRef)(),
      _useState = (0, _react.useState)(0),
      inputKey = _useState[0],
      forceUpdate = _useState[1],
      _useReducer = (0, _react.useReducer)(_reducer["default"], _initialState["default"]),
      state = _useReducer[0],
      dispatch = _useReducer[1],
      isLoading = state.isLoading,
      isLoadingFailed = state.isLoadingFailed,
      isOptions = state.isOptions,
      options = state.options,
      ticket = state.ticket,
      action = (0, _crAction["default"])(dispatch),
      _onInputChange = crInputChange(action, searchApi);

  var _onEnter = function _onEnter() {
    if (isSearch) {
      _onInputChange.cancel();
    }
  };

  var _onClickItem = function _onClickItem(value) {
    action.setTicket(value);
    forceUpdate(function (n) {
      return n + 1;
    });
  };

  var _onKeyDown = function _onKeyDown(event) {
    var keyCode = event.keyCode;

    if (_isHideOptions(keyCode)) {
      action.hideOptions();
      refInput.current.focus();
    } else if (_isShowOptions(keyCode, options)) {
      action.showOptions();
    }
  };

  (0, _react.useEffect)(function () {
    if (refInput.curent) {
      refInput.current.focus();
    }
  }, [inputKey]);

  var onKeyDown = isSearch ? _onKeyDown : null,
      onInputChange = isSearch ? _onInputChange : null,
      _rootStyle = isOptions ? (0, _extends2["default"])({}, S.ROOT, S.ROOT_OPTIONS) : S.ROOT;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _rootStyle,
    tabIndex: "-1",
    role: "textbox",
    onKeyDown: onKeyDown
  }, /*#__PURE__*/_react["default"].createElement(_InputText["default"], {
    ref: refInput,
    key: inputKey,
    style: S.INPUT,
    initValue: ticket,
    onInputChange: onInputChange,
    onEnter: _onEnter
  }), /*#__PURE__*/_react["default"].createElement("hr", {
    className: CL.INPUT_HR
  }), isSearch && /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement(_ToggleButton["default"], {
    isLoading: isLoading,
    isLoadingFailed: isLoadingFailed,
    options: options,
    isOptions: isOptions,
    toggleOptions: action.toggleOptions
  }), /*#__PURE__*/_react["default"].createElement(_SearchOptions["default"], {
    isShow: isOptions,
    options: options,
    onClickItem: _onClickItem
  })));
};

var _default = InputSearch;
exports["default"] = _default;
//# sourceMappingURL=InputSearch.js.map