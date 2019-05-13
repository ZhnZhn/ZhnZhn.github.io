'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FAILED_COLOR = '#f44336';
var S = {
  LOADING: {
    margin: '16px auto'
  },
  LOAD_FAILED: {
    borderColor: FAILED_COLOR
  },
  ERR_MSG: {
    color: FAILED_COLOR,
    paddingLeft: 16,
    fontWeight: 600
  }
};

var Loading = function Loading() {
  return _react2.default.createElement('div', {
    'data-loader': 'circle',
    style: S.LOADING
  });
};
var LoadFailed = function LoadFailed(_ref) {
  var _ref$errMsg = _ref.errMsg,
      errMsg = _ref$errMsg === undefined ? '' : _ref$errMsg;
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement('div', {
      'data-loader': 'circle-failed',
      style: (0, _extends3.default)({}, S.LOADING, S.LOAD_FAILED)
    }),
    _react2.default.createElement(
      'p',
      { style: S.ERR_MSG },
      errMsg + ': Network error.'
    )
  );
};

var Load = {
  Loading: Loading,
  LoadFailed: LoadFailed
};

exports.default = Load;
//# sourceMappingURL=Load.js.map