'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  rootDiv: {
    lineHeight: 2,
    backgroundColor: '#4D4D4D'
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
  _inherits(OpenClose, _Component);

  function OpenClose(props) {
    _classCallCheck(this, OpenClose);

    var _this = _possibleConstructorReturn(this, (OpenClose.__proto__ || Object.getPrototypeOf(OpenClose)).call(this));

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

  _createClass(OpenClose, [{
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
            { style: { width: '16px', height: '16px', display: 'inline-block' } },
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\OpenClose.js.map