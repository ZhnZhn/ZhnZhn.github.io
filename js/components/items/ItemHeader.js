'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'ELEMENT';

var CL = "not-selected shadow-right";
var MAX_LENGTH = 45;

var S = {
  ROOT: {
    backgroundColor: '#1b2836',
    paddingTop: '6px',
    paddingLeft: '10px',
    paddingRight: '42px',
    paddingBottom: '6px',
    height: 'auto',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    position: 'relative'
  },
  CAPTION: {
    display: 'inline-block',
    cursor: 'pointer',
    width: '340px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: 'inherit'
  },
  OPEN: {
    color: 'rgba(164, 135, 212, 1)'
  },
  CLOSE: {
    color: 'gray'
  },
  SVG_CLOSE: {
    position: 'absolute',
    right: 0,
    top: '4px'
  }
};

var ItemHeader = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(ItemHeader, _Component);

  function ItemHeader() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ItemHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ItemHeader.__proto__ || Object.getPrototypeOf(ItemHeader)).call.apply(_ref, [this].concat(args))), _this), _this._hKeyPress = function (evt) {
      evt.preventDefault();
      var which = evt.which;

      if (which === 13 || which === 32) {
        _this.props.onClick();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ItemHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          isOpen = _props.isOpen,
          rootStyle = _props.rootStyle,
          captionStyle = _props.captionStyle,
          caption = _props.caption,
          title = _props.title,
          children = _props.children,
          onClick = _props.onClick,
          onClose = _props.onClose,
          TS = theme.getStyle(TH_ID),
          _title = title || caption.length > MAX_LENGTH ? caption : undefined,
          _styleCaption = isOpen ? (0, _extends3.default)({}, S.CAPTION, captionStyle, S.OPEN) : (0, _extends3.default)({}, S.CAPTION, captionStyle, S.CLOSE);

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, S.ROOT, rootStyle, TS.ROOT) },
        _react2.default.createElement(
          'span',
          {
            className: CL,
            title: _title,
            style: _styleCaption,
            onClick: onClick,
            tabIndex: '0',
            role: 'button',
            onKeyPress: this._hKeyPress
          },
          caption
        ),
        children,
        _react2.default.createElement(_SvgClose2.default, {
          style: S.SVG_CLOSE,
          onClose: onClose
        })
      );
    }
  }]);
  return ItemHeader;
}(_react.Component), _class.defaultProps = {
  caption: ''
}, _temp2);
exports.default = (0, _withTheme2.default)(ItemHeader);
//# sourceMappingURL=ItemHeader.js.map