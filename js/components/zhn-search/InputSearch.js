'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _SearchOptions = require('./SearchOptions');

var _SearchOptions2 = _interopRequireDefault(_SearchOptions);

var _ToggleButton = require('./ToggleButton');

var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

var _initialState = require('./flux/initialState');

var _initialState2 = _interopRequireDefault(_initialState);

var _reducer = require('./flux/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _crAction = require('./flux/crAction');

var _crAction2 = _interopRequireDefault(_crAction);

var _crInputChange = require('./flux/crInputChange');

var _crInputChange2 = _interopRequireDefault(_crInputChange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      isSearch = _ref$isSearch === undefined ? true : _ref$isSearch,
      searchApi = _ref.searchApi,
      _ref$crInputChange = _ref.crInputChange,
      crInputChange = _ref$crInputChange === undefined ? _crInputChange2.default : _ref$crInputChange;
  var refInput = (0, _react.useRef)(),
      _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      inputKey = _useState2[0],
      forceUpdate = _useState2[1],
      _useReducer = (0, _react.useReducer)(_reducer2.default, _initialState2.default),
      _useReducer2 = (0, _slicedToArray3.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1],
      isLoading = state.isLoading,
      isLoadingFailed = state.isLoadingFailed,
      isOptions = state.isOptions,
      options = state.options,
      ticket = state.ticket,
      action = (0, _crAction2.default)(dispatch),
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
      _rootStyle = isOptions ? (0, _extends3.default)({}, S.ROOT, S.ROOT_OPTIONS) : S.ROOT;

  return _react2.default.createElement(
    'div',
    { style: _rootStyle,
      tabIndex: "-1",
      role: 'textbox',
      onKeyDown: onKeyDown
    },
    _react2.default.createElement(_InputText2.default, {
      ref: refInput,
      key: inputKey,
      style: S.INPUT,
      initValue: ticket,
      onInputChange: onInputChange,
      onEnter: _onEnter
    }),
    _react2.default.createElement('hr', { className: CL.INPUT_HR }),
    isSearch && _react2.default.createElement(
      _react.Fragment,
      null,
      _react2.default.createElement(_ToggleButton2.default, {
        isLoading: isLoading,
        isLoadingFailed: isLoadingFailed,
        options: options,
        isOptions: isOptions,
        toggleOptions: action.toggleOptions
      }),
      _react2.default.createElement(_SearchOptions2.default, {
        isShow: isOptions,
        options: options,
        onClickItem: _onClickItem
      })
    )
  );
};

exports.default = InputSearch;
//# sourceMappingURL=InputSearch.js.map