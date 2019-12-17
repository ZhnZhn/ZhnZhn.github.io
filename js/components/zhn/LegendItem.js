"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var S = {
  ROOT: {
    display: 'inline-block',
    border: '1px solid',
    borderRadius: '10px',
    //marginLeft : '18px',
    //marginLeft : '8px',
    marginLeft: '12px',
    marginTop: '10px',
    cursor: 'pointer'
  },
  ITEM: {
    display: 'inline-block',
    paddingLeft: '5px',
    //paddingRight : '20px'
    paddingRight: '6px'
  },
  CIRCLE: {
    display: 'inline-block',
    //marginLeft : '15px',
    marginLeft: '6px',
    backgroundColor: 'gray',
    width: '12px',
    height: '12px',
    border: '1px solid gray',
    borderRadius: '50%'
  }
};

var LegendItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(LegendItem, _Component);

  function LegendItem(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._handleClickItem = function () {
      var _this$props = _this.props,
          item = _this$props.item,
          onClickItem = _this$props.onClickItem;
      onClickItem(item);

      _this.setState({
        isVisible: !_this.state.isVisible
      });
    };

    _this.state = {
      isVisible: props.item.isVisible
    };
    return _this;
  }

  var _proto = LegendItem.prototype;

  _proto.render = function render() {
    var item = this.props.item,
        color = item.color,
        name = item.name,
        isVisible = this.state.isVisible,
        _styleRoot = isVisible ? {
      color: color,
      borderColor: color,
      borderWidth: '2px',
      fontWeight: 'bold'
    } : {
      color: color,
      borderColor: 'gray',
      borderWidth: '1px',
      fontWeight: 'normal'
    },
        _styleCircle = isVisible ? {
      backgroundColor: color,
      borderColor: color
    } : {
      backgroundColor: 'gray',
      borderColor: 'gray'
    };

    return _react["default"].createElement("span", {
      style: (0, _extends2["default"])({}, S.ROOT, {}, _styleRoot),
      onClick: this._handleClickItem
    }, _react["default"].createElement("span", {
      style: (0, _extends2["default"])({}, S.CIRCLE, {}, _styleCircle)
    }), _react["default"].createElement("span", {
      style: S.ITEM
    }, name));
  };

  return LegendItem;
}(_react.Component);

LegendItem.defaultProps = {
  item: {}
};
var _default = LegendItem;
exports["default"] = _default;
//# sourceMappingURL=LegendItem.js.map