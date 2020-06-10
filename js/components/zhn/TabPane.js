"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

//import PropTypes from "prop-types";
var CL = "tabpane__tabs";
var S = {
  UL: {
    listStyle: 'outside none none',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    borderBottom: '2px solid rgba(164, 135, 212, 1)'
  },
  BLOCK: {
    display: 'block',
    width: "100%",
    height: "100%"
  },
  NONE: {
    display: 'none'
  },
  DIV: {
    width: "100%",
    height: "100%"
  }
};

var TabPane = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(TabPane, _Component);

  /*
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node)
  }
  */
  function TabPane(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hClickTab = function (index) {
      _this.setState({
        selectedTabIndex: index
      });
    };

    _this._renderTabs = function (children) {
      var selectedTabIndex = _this.state.selectedTabIndex;
      return children.map(function (tab, index) {
        var isSelected = index === selectedTabIndex;
        return /*#__PURE__*/_react["default"].cloneElement(tab, {
          key: index,
          onClick: _this._hClickTab.bind(null, index),
          isSelected: isSelected
        });
      });
    };

    _this._renderComponents = function () {
      var children = _this.props.children;
      var selectedTabIndex = _this.state.selectedTabIndex;
      return children.map(function (tab, index) {
        var _isSelected = index === selectedTabIndex,
            _divStyle = _isSelected ? S.BLOCK : S.NONE;

        return /*#__PURE__*/_react["default"].createElement("div", {
          style: _divStyle,
          key: 'a' + index
        }, /*#__PURE__*/_react["default"].cloneElement(tab.props.children, {
          key: 'comp' + index,
          isSelected: _isSelected
        }));
      });
    };

    _this.getSelectedTabIndex = function () {
      return _this.state.selectedTabIndex;
    };

    _this.state = {
      selectedTabIndex: 0
    };
    return _this;
  }

  var _proto = TabPane.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        width = _this$props.width,
        height = _this$props.height;
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        width: width,
        height: height
      }
    }, /*#__PURE__*/_react["default"].createElement("ul", {
      className: CL,
      style: S.UL
    }, this._renderTabs(children)), /*#__PURE__*/_react["default"].createElement("div", {
      style: S.DIV
    }, this._renderComponents()));
  };

  return TabPane;
}(_react.Component);

var _default = TabPane;
exports["default"] = _default;
//# sourceMappingURL=TabPane.js.map