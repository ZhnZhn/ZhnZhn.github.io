'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    lineHeight: 2,
    backgroundColor: '#4D4D4D'
  },
  rootSvg: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginLeft: '8px'
  },
  labelCaption: {
    paddingLeft: '4px',
    verticalAlign: 'top',
    color: 'rgba(164, 135, 212, 1)',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  itemRow: {
    backgroundColor: '#404040'
  }
};

var OpenClose = function (_Component) {
  (0, _inherits3.default)(OpenClose, _Component);

  function OpenClose(props) {
    (0, _classCallCheck3.default)(this, OpenClose);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OpenClose.__proto__ || Object.getPrototypeOf(OpenClose)).call(this));

    _this._handleClickOpenClose = function () {
      _this.setState(function (prev) {
        return { isOpen: !prev.isOpen };
      });
    };

    var isOpen = props.isClose ? false : true;
    _this.state = {
      isOpen: isOpen,
      pathOpen: "M 2,14 L 14,14 14,2 2,14",
      fillOpen: "yellow",
      pathClose: "M 2,2 L 14,8 2,14 2,2",
      fillClose: "#4D4D4D"
    };
    return _this;
  }

  (0, _createClass3.default)(OpenClose, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          children = _props.children,
          _state = this.state,
          isOpen = _state.isOpen,
          pathOpen = _state.pathOpen,
          fillOpen = _state.fillOpen,
          pathClose = _state.pathClose,
          fillClose = _state.fillClose;

      var pathV = void 0,
          fillV = void 0,
          displayDivStyle = void 0,
          classShow = void 0;
      if (isOpen) {
        pathV = pathOpen;
        fillV = fillOpen;
        displayDivStyle = 'block';
        classShow = 'show-popup';
      } else {
        pathV = pathClose;
        fillV = fillClose;
        displayDivStyle = 'none';
        classShow = null;
      }

      return _react2.default.createElement(
        'div',
        { style: styles.rootDiv },
        _react2.default.createElement(
          'div',
          { className: 'not-selected', onClick: this._handleClickOpenClose },
          _react2.default.createElement(
            'div',
            { style: styles.rootSvg },
            _react2.default.createElement(
              'svg',
              {
                viewBox: '0 0 16 16', width: '100%', height: '100%',
                preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
                style: { display: 'inline-block' }
              },
              _react2.default.createElement('path', {
                d: pathV,
                fill: fillV,
                strokeWidth: '1', stroke: 'yellow'
              })
            )
          ),
          _react2.default.createElement(
            'span',
            { style: styles.labelCaption },
            caption
          )
        ),
        _react2.default.createElement(
          'div',
          { className: classShow, style: { display: displayDivStyle } },
          children
        )
      );
    }
  }]);
  return OpenClose;
}(_react.Component);

exports.default = OpenClose;
//# sourceMappingURL=OpenClose.js.map