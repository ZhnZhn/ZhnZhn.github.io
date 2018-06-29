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
  SHOW: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

var DF = {
  FILL_OPEN: _Color2.default.YELLOW,
  //FILL_OPEN: C.TITLE,
  FILL_CLOSE: _Color2.default.BLANK
};

var S = {
  ROOT: {
    lineHeight: 1.5
  },
  DIV_SVG: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginLeft: '8px'
  },
  SVG: {
    display: 'inline-block'
  },
  CAPTION: {
    //color: C.SIREN,
    color: _Color2.default.TITLE,
    paddingLeft: '4px',
    verticalAlign: 'top',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

var PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
var PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

var OpenClose2 = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(OpenClose2, _Component);

  function OpenClose2(props) {
    (0, _classCallCheck3.default)(this, OpenClose2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OpenClose2.__proto__ || Object.getPrototypeOf(OpenClose2)).call(this));

    _this._handleClickOpenClose = function () {
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

  (0, _createClass3.default)(OpenClose2, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          styleNotSelected = _props.styleNotSelected,
          styleCaption = _props.styleCaption,
          caption = _props.caption,
          fillOpen = _props.fillOpen,
          fillClose = _props.fillClose,
          isDraggable = _props.isDraggable,
          option = _props.option,
          onDragStart = _props.onDragStart,
          onDragEnter = _props.onDragEnter,
          onDragOver = _props.onDragOver,
          onDragLeave = _props.onDragLeave,
          onDrop = _props.onDrop,
          children = _props.children,
          isOpen = this.state.isOpen,
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
      if (isOpen) {
        _pathV = PATH_OPEN;
        _fillV = fillOpen;
        _displayDivStyle = 'block';
        _classShow = CL.SHOW;
        _styleNotSelected = null;
      } else {
        _pathV = PATH_CLOSE;
        _fillV = fillClose;
        _displayDivStyle = 'none';
        _classShow = null;
        _styleNotSelected = styleNotSelected;
      }

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, S.ROOT, style) },
        _react2.default.createElement(
          'div',
          (0, _extends3.default)({
            className: CL.NOT_SELECTED,
            style: _styleNotSelected,
            onClick: this._handleClickOpenClose
          }, _dragOption),
          _react2.default.createElement(
            'div',
            { style: S.DIV_SVG },
            _react2.default.createElement(
              'svg',
              {
                viewBox: '0 0 16 16', width: '100%', height: '100%',
                preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
                style: S.SVG
              },
              _react2.default.createElement('path', {
                d: _pathV, fill: _fillV,
                strokeWidth: '1', stroke: fillOpen
              })
            )
          ),
          _react2.default.createElement(
            'span',
            { style: (0, _extends3.default)({}, S.CAPTION, styleCaption) },
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
}(_react.Component), _class.defaultProps = {
  fillOpen: DF.FILL_OPEN,
  fillClose: DF.FILL_CLOSE
}, _temp);
exports.default = OpenClose2;
//# sourceMappingURL=OpenClose2.js.map