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
//import PropTypes from 'prop-types'

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Color = require('../styles/Color');

var _Color2 = _interopRequireDefault(_Color);

var _isKeyEnter = require('./isKeyEnter');

var _isKeyEnter2 = _interopRequireDefault(_isKeyEnter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ROOT: 'zhn-oc',
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

var DF = {
  OPEN_COLOR: _Color2.default.TITLE,
  CLOSE_COLOR: _Color2.default.BLANK
};

var S = {
  ROOT_DIV: {
    lineHeight: 2
  },
  ROOT_SVG: {
    display: 'inline-block',
    width: 16,
    height: 16,
    marginLeft: 8
  },
  CAPTION: {
    color: _Color2.default.TITLE,
    paddingLeft: 4,
    verticalAlign: 'top',
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

var _crConf = function _crConf(_ref) {
  var isOpen = _ref.isOpen,
      openColor = _ref.openColor,
      closeColor = _ref.closeColor;
  return isOpen ? {
    _pathV: PATH_OPEN,
    _fillV: openColor,
    _rootChildStyle: S.BLOCK,
    _rootChildCl: CL.SHOW_POPUP
  } : {
    _pathV: PATH_CLOSE,
    _fillV: closeColor,
    _rootChildStyle: S.NONE,
    _rootChildCl: null
  };
};

var OpenClose = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(OpenClose, _Component);

  function OpenClose(props) {
    (0, _classCallCheck3.default)(this, OpenClose);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OpenClose.__proto__ || Object.getPrototypeOf(OpenClose)).call(this, props));

    _this._hClick = function () {
      _this.setState(function (prev) {
        return {
          isOpen: !prev.isOpen
        };
      });
    };

    _this._hKeyDown = function (event) {
      if ((0, _isKeyEnter2.default)(event)) {
        _this._hClick();
      }
    };

    var isClose = props.isClose;

    _this.state = {
      isOpen: isClose ? false : true
    };
    return _this;
  }
  /*
  static propTypes = {
    isClose: PropTypes.bool,
      rootStyle: PropTypes.object,
    ocStyle: PropTypes.object,
    caption: PropTypes.string,
    captionStyle: PropTypes.object,
    openColor: PropTypes.string,
    closeColor: PropTypes.string,
    CompAfter: PropTypes.node,
    childStyle: PropTypes.object
  }
  */

  (0, _createClass3.default)(OpenClose, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          ocStyle = _props.ocStyle,
          caption = _props.caption,
          captionStyle = _props.captionStyle,
          openColor = _props.openColor,
          closeColor = _props.closeColor,
          CompAfter = _props.CompAfter,
          childStyle = _props.childStyle,
          children = _props.children,
          isOpen = this.state.isOpen,
          _crConf2 = _crConf({ isOpen: isOpen, openColor: openColor, closeColor: closeColor }),
          _pathV = _crConf2._pathV,
          _fillV = _crConf2._fillV,
          _rootChildStyle = _crConf2._rootChildStyle,
          _rootChildCl = _crConf2._rootChildCl;

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, S.ROOT_DIV, rootStyle) },
        _react2.default.createElement(
          'div',
          { className: CL.NOT_SELECTED },
          _react2.default.createElement(
            'div',
            {
              role: 'menuitem',
              tabIndex: '0',
              className: CL.ROOT,
              style: ocStyle,
              onClick: this._hClick,
              onKeyDown: this._hKeyDown
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
                  fill: _fillV,
                  strokeWidth: '1',
                  stroke: openColor,
                  d: _pathV
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