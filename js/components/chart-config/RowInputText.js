'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingRight: '6px'
  },
  CAPTION: {
    color: 'rgb(27, 117, 187)',
    display: 'inline-block',
    textAlign: 'right',
    width: '80px',
    paddingRight: '5px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: '250px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var RowInputText = function RowInputText(_ref) {
  var styleRoot = _ref.styleRoot,
      caption = _ref.caption,
      initValue = _ref.initValue,
      onEnter = _ref.onEnter;
  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, STYLE.ROOT, styleRoot) },
    _react2.default.createElement(
      'label',
      null,
      _react2.default.createElement(
        'span',
        { style: STYLE.CAPTION },
        caption
      ),
      _react2.default.createElement(_InputText2.default, {
        style: STYLE.INPUT_TEXT,
        initValue: initValue,
        onEnter: onEnter
      })
    )
  );
};

process.env.NODE_ENV !== "production" ? RowInputText.propTypes = {
  styleRoot: _react.PropTypes.object,
  caption: _react.PropTypes.string,
  initValue: _react.PropTypes.string,
  onEnter: _react.PropTypes.func
} : void 0;

exports.default = RowInputText;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\RowInputText.js.map