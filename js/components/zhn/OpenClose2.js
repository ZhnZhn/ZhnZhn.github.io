"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var CL = {
  SHOW: 'show-popup',
  NOT_SELECTED: 'not-selected'
};
var DF = {
  FILL_OPEN: _Color["default"].YELLOW,
  //FILL_OPEN: C.TITLE,
  FILL_CLOSE: _Color["default"].BLANK
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
    color: _Color["default"].TITLE,
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

var OpenClose2 =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(OpenClose2, _Component);

  function OpenClose2(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._handleClickOpenClose = function () {
      _this.setState(function (prev) {
        return {
          isOpen: !prev.isOpen
        };
      });
    };

    var isClose = props.isClose;
    _this.state = {
      isOpen: isClose ? false : true
    };
    return _this;
  }

  var _proto = OpenClose2.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        styleNotSelected = _this$props.styleNotSelected,
        styleCaption = _this$props.styleCaption,
        caption = _this$props.caption,
        fillOpen = _this$props.fillOpen,
        fillClose = _this$props.fillClose,
        isDraggable = _this$props.isDraggable,
        option = _this$props.option,
        onDragStart = _this$props.onDragStart,
        onDragEnter = _this$props.onDragEnter,
        onDragOver = _this$props.onDragOver,
        onDragLeave = _this$props.onDragLeave,
        onDrop = _this$props.onDrop,
        children = _this$props.children,
        isOpen = this.state.isOpen,
        _dragOption = isDraggable ? {
      draggable: true,
      onDragStart: onDragStart.bind(null, option),
      onDrop: onDrop.bind(null, option),
      onDragEnter: onDragEnter,
      onDragOver: onDragOver,
      onDragLeave: onDragLeave
    } : undefined;

    var _pathV, _fillV, _displayDivStyle, _classShow, _styleNotSelected;

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

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.ROOT, {}, style)
    }, _react["default"].createElement("div", (0, _extends2["default"])({
      className: CL.NOT_SELECTED,
      style: _styleNotSelected,
      onClick: this._handleClickOpenClose
    }, _dragOption), _react["default"].createElement("div", {
      style: S.DIV_SVG
    }, _react["default"].createElement("svg", {
      viewBox: "0 0 16 16",
      width: "100%",
      height: "100%",
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: S.SVG
    }, _react["default"].createElement("path", {
      d: _pathV,
      fill: _fillV,
      strokeWidth: "1",
      stroke: fillOpen
    }))), _react["default"].createElement("span", {
      style: (0, _extends2["default"])({}, S.CAPTION, {}, styleCaption)
    }, caption)), _react["default"].createElement("div", {
      className: _classShow,
      style: {
        display: _displayDivStyle
      }
    }, children));
  };

  return OpenClose2;
}(_react.Component);

OpenClose2.defaultProps = {
  fillOpen: DF.FILL_OPEN,
  fillClose: DF.FILL_CLOSE
};
var _default = OpenClose2;
exports["default"] = _default;
//# sourceMappingURL=OpenClose2.js.map