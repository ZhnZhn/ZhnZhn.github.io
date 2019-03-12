'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6
  },
  CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 220,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var COLLON = ':';

var RowInputText = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(RowInputText, _Component);

  function RowInputText() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RowInputText);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RowInputText.__proto__ || Object.getPrototypeOf(RowInputText)).call.apply(_ref, [this].concat(args))), _this), _this._refInput = function (node) {
      return _this._inputComp = node;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /*
  static propTypes={
    styleRoot: PropTypes.object,
    styleCaption: PropTypes.object,
    styleInput: PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.string,
    onEnter: PropTypes.func
  }
  */


  (0, _createClass3.default)(RowInputText, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          styleRoot = _props.styleRoot,
          styleCaption = _props.styleCaption,
          caption = _props.caption,
          styleInput = _props.styleInput,
          rest = (0, _objectWithoutProperties3.default)(_props, ['styleRoot', 'styleCaption', 'caption', 'styleInput']),
          _caption = caption.indexOf(COLLON) === -1 ? caption + COLLON : caption;

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, S.ROOT, styleRoot) },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement(
            'span',
            { style: (0, _extends3.default)({}, S.CAPTION, styleCaption) },
            _caption
          ),
          _react2.default.createElement(_InputText2.default, (0, _extends3.default)({
            ref: this._refInput,
            style: (0, _extends3.default)({}, S.INPUT_TEXT, styleInput)
          }, rest))
        )
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this._inputComp.getValue();
    }
  }]);
  return RowInputText;
}(_react.Component), _class.defaultProps = {
  caption: 'Input'
}, _temp2);
exports.default = RowInputText;
//# sourceMappingURL=RowInputText.js.map