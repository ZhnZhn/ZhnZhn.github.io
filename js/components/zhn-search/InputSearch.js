"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _InputText = _interopRequireDefault(require("../zhn/InputText"));
var _SearchOptions = _interopRequireDefault(require("./SearchOptions"));
var _ToggleButton = _interopRequireDefault(require("./ToggleButton"));
var _initialState = _interopRequireDefault(require("./flux/initialState"));
var _reducer = _interopRequireDefault(require("./flux/reducer"));
var _crAction = _interopRequireDefault(require("./flux/crAction"));
var _crInputChange = _interopRequireDefault(require("./flux/crInputChange"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_INPUT_HR = 'zhn-search__input__hr',
  S_ROOT = {
    ..._styleFn.S_BORDER_RADIUS_2,
    position: 'relative',
    width: 250,
    height: 36,
    background: 'none 0px 0px repeat scroll rgb(225, 225, 203)'
  },
  S_INPUT = {
    ..._styleFn.S_BORDER_RADIUS_2,
    display: 'block',
    width: '100%',
    height: 30,
    paddingLeft: 10,
    marginLeft: 0,
    boxShadow: 'none'
  };
const _isHideOptions = keyCode => keyCode === 38 || keyCode === 46 || keyCode === 27;
const _isShowOptions = (keyCode, options) => keyCode === 40 && options.length > 0;
const InputSearch = _ref => {
  let {
    isSearch = true,
    searchApi,
    crInputChange
  } = _ref;
  const refInput = (0, _uiApi.useRef)(),
    [inputKey, forceUpdate] = (0, _uiApi.useState)(0),
    [state, dispatch] = (0, _uiApi.useReducer)(_reducer.default, _initialState.default),
    {
      isLoading,
      isLoadingFailed,
      isOptions,
      options,
      ticket
    } = state,
    action = (0, _uiApi.useMemo)(() => (0, _crAction.default)(dispatch), []),
    _onInputChange = (0, _uiApi.useMemo)(() => (crInputChange || _crInputChange.default)(action, searchApi), [action, searchApi, crInputChange]);
  const _onEnter = () => {
    if (isSearch) {
      _onInputChange.cancel();
    }
  };
  const _onClickItem = value => {
    action.setTicket(value);
    forceUpdate(n => n + 1);
  };
  const _onKeyDown = event => {
    const {
      keyCode
    } = event;
    if (_isHideOptions(keyCode)) {
      action.hideOptions();
      (0, _uiApi.focusRefElement)(refInput);
    } else if (_isShowOptions(keyCode, options)) {
      action.showOptions();
    }
  };
  (0, _uiApi.useEffect)(() => {
    (0, _uiApi.focusRefElement)(refInput);
  }, [inputKey]);
  const onKeyDown = isSearch ? _onKeyDown : null,
    onInputChange = isSearch ? _onInputChange : null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT,
    tabIndex: "-1",
    role: "textbox",
    onKeyDown: onKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
      refEl: refInput,
      style: S_INPUT,
      initValue: ticket,
      onChange: onInputChange,
      onEnter: _onEnter
    }, inputKey), /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
      className: CL_INPUT_HR
    }), isSearch && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleButton.default, {
        isLoading: isLoading,
        isLoadingFailed: isLoadingFailed,
        options: options,
        isOptions: isOptions,
        toggleOptions: action.toggleOptions
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SearchOptions.default, {
        isShow: isOptions,
        options: options,
        onClickItem: _onClickItem
      })]
    })]
  });
};
var _default = exports.default = InputSearch;
//# sourceMappingURL=InputSearch.js.map