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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Color = require('../styles/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

var DF = {
  //OPEN_COLOR: C.YELLOW,
  OPEN_COLOR: _Color2.default.TITLE,
  CLOSE_COLOR: _Color2.default.BLANK
};

var S = {
  ROOT_DIV: {
    lineHeight: 2
  },
  ROOT_SVG: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginLeft: '8px'
  },
  CAPTION: {
    //color: C.SIREN,
    color: _Color2.default.TITLE,
    paddingLeft: '4px',
    verticalAlign: 'top',
    //color: 'rgba(164, 135, 212, 1)',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },

  INLINE_BLOCK: {
    display: 'inline-block'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

var PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
var PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

var OpenClose = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(OpenClose, _Component);

  function OpenClose(props) {
    (0, _classCallCheck3.default)(this, OpenClose);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OpenClose.__proto__ || Object.getPrototypeOf(OpenClose)).call(this));

    _this._handleClick = function () {
      _this.setState(function (prev) {
        return { isOpen: !prev.isOpen };
      });
    };

    var isClose = props.isClose;

    _this.state = {
      isOpen: isClose ? false : true
    };
    return _this;
  }

  (0, _createClass3.default)(OpenClose, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          caption = _props.caption,
          captionStyle = _props.captionStyle,
          openColor = _props.openColor,
          closeColor = _props.closeColor,
          CompAfter = _props.CompAfter,
          childStyle = _props.childStyle,
          children = _props.children,
          isOpen = this.state.isOpen;

      var _pathV = void 0,
          _fillV = void 0,
          _rootChildStyle = void 0,
          _rootChildCl = void 0;
      if (isOpen) {
        _pathV = PATH_OPEN;
        _fillV = openColor;
        _rootChildStyle = S.BLOCK;
        _rootChildCl = CL.SHOW_POPUP;
      } else {
        _pathV = PATH_CLOSE;
        _fillV = closeColor;
        _rootChildStyle = S.NONE;
        _rootChildCl = null;
      }

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, S.ROOT_DIV, rootStyle) },
        _react2.default.createElement(
          'div',
          { className: CL.NOT_SELECTED },
          _react2.default.createElement(
            'div',
            {
              style: S.INLINE_BLOCK,
              onClick: this._handleClick
            },
            _react2.default.createElement(
              'div',
              { style: S.ROOT_SVG },
              _react2.default.createElement(
                'svg',
                {
                  viewBox: '0 0 16 16', width: '100%', height: '100%',
                  preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
                  style: S.INLINE_BLOCK
                },
                _react2.default.createElement('path', {
                  d: _pathV,
                  fill: _fillV,
                  strokeWidth: '1',
                  stroke: openColor
                })
              )
            ),
            _react2.default.createElement(
              'span',
              { style: (0, _extends3.default)({}, S.CAPTION, captionStyle) },
              caption
            )
          ),
          CompAfter
        ),
        _react2.default.createElement(
          'div',
          {
            className: _rootChildCl,
            style: (0, _extends3.default)({}, childStyle, _rootChildStyle)
          },
          children
        )
      );
    }
  }]);
  return OpenClose;
}(_react.Component), _class.defaultProps = {
  openColor: DF.OPEN_COLOR,
  closeColor: DF.CLOSE_COLOR
}, _temp);
exports.default = OpenClose;
//# sourceMappingURL=OpenClose.js.map