'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  rootDiv: {
    backgroundColor: '#4D4D4D',
    lineHeight: 1.5
  },
  divSvg: {
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

var pathOpen = "M 2,14 L 14,14 14,2 2,14";
var pathClose = "M 2,2 L 14,8 2,14 2,2";

var OpenClose2 = function (_Component) {
  _inherits(OpenClose2, _Component);

  function OpenClose2(props) {
    _classCallCheck(this, OpenClose2);

    var _this = _possibleConstructorReturn(this, (OpenClose2.__proto__ || Object.getPrototypeOf(OpenClose2)).call(this));

    _this._handleClickOpenClose = function () {
      _this.setState(function (prev) {
        return { isOpen: !prev.isOpen };
      });
    };

    var isOpen = props.isClose ? false : true,
        fillOpen = props.fillOpen ? props.fillOpen : 'yellow',
        fillClose = props.fillClose ? props.fillClose : '#4D4D4D';
    _this.state = {
      isOpen: isOpen,
      fillOpen: fillOpen,
      fillClose: fillClose
    };
    return _this;
  }

  _createClass(OpenClose2, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          styleNotSelected = _props.styleNotSelected,
          styleCaption = _props.styleCaption,
          caption = _props.caption,
          isDraggable = _props.isDraggable,
          option = _props.option,
          onDragStart = _props.onDragStart,
          onDragEnter = _props.onDragEnter,
          onDragOver = _props.onDragOver,
          onDragLeave = _props.onDragLeave,
          onDrop = _props.onDrop,
          children = _props.children,
          _dragOption = isDraggable ? {
        draggable: true,
        onDragStart: onDragStart.bind(null, option),
        onDrop: onDrop.bind(null, option),
        onDragEnter: onDragEnter,
        onDragOver: onDragOver,
        onDragLeave: onDragLeave
      } : undefined;

      var _pathV = void 0,
          _fillV = void 0,
          _displayDivStyle = void 0,
          _classShow = void 0,
          _styleNotSelected = void 0;
      if (this.state.isOpen) {
        _pathV = pathOpen;
        _fillV = this.state.fillOpen;
        _displayDivStyle = 'block';
        _classShow = 'show-popup';
        _styleNotSelected = null;
      } else {
        _pathV = pathClose;
        _fillV = this.state.fillClose;
        _displayDivStyle = 'none';
        _classShow = null;
        _styleNotSelected = styleNotSelected;
      }

      return _react2.default.createElement(
        'div',
        { style: Object.assign({}, styles.rootDiv, style) },
        _react2.default.createElement(
          'div',
          _extends({
            className: 'not-selected',
            style: _styleNotSelected,
            onClick: this._handleClickOpenClose
          }, _dragOption),
          _react2.default.createElement(
            'div',
            { style: styles.divSvg },
            _react2.default.createElement(
              'svg',
              {
                viewBox: '0 0 16 16', width: '100%', height: '100%',
                preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
                style: { display: 'inline-block' }
              },
              _react2.default.createElement('path', {
                d: _pathV,
                fill: _fillV,
                strokeWidth: '1', stroke: this.state.fillOpen
              })
            )
          ),
          _react2.default.createElement(
            'span',
            { style: Object.assign({}, styles.labelCaption, styleCaption) },
            caption
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _classShow, style: { display: _displayDivStyle } },
          children
        )
      );
    }
  }]);

  return OpenClose2;
}(_react.Component);

exports.default = OpenClose2;
//# sourceMappingURL=OpenClose2.js.map