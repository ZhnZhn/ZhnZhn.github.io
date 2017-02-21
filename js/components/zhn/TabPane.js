'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  ulStyle: {
    listStyle: 'outside none none',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '5px',
    borderBottom: '2px solid rgba(164, 135, 212, 1)'
  }
};

var TabPane = (_temp = _class = function (_Component) {
  _inherits(TabPane, _Component);

  function TabPane(props) {
    _classCallCheck(this, TabPane);

    var _this = _possibleConstructorReturn(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).call(this));

    _initialiseProps.call(_this);

    var components = props.children.map(function (tab, index) {
      return _react2.default.cloneElement(tab.props.children, { key: 'comp' + index });
    });
    _this.state = {
      selectedTabIndex: 0,
      components: components
    };
    return _this;
  }

  _createClass(TabPane, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          width = _props.width,
          height = _props.height;

      return _react2.default.createElement(
        'div',
        { style: { width: width, height: height } },
        _react2.default.createElement(
          'ul',
          { className: 'tabpane__tabs', style: styles.ulStyle },
          this._renderTabs(children)
        ),
        _react2.default.createElement(
          'div',
          { style: { width: "100%", height: "100%" } },
          this._renderComponents()
        )
      );
    }
  }]);

  return TabPane;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleClickTab = function (index) {
    _this2.setState({ selectedTabIndex: index });
  };

  this._renderTabs = function (children) {
    var selectedTabIndex = _this2.state.selectedTabIndex;

    return children.map(function (tab, index) {
      var isSelected = index === selectedTabIndex ? true : false;
      return _react2.default.cloneElement(tab, { key: index, onClick: _this2._handleClickTab.bind(null, index), isSelected: isSelected });
    });
  };

  this._renderComponents = function () {
    var _state = _this2.state,
        selectedTabIndex = _state.selectedTabIndex,
        components = _state.components;

    return components.map(function (comp, index) {
      var divStyle = index === selectedTabIndex ? { display: 'block', width: "100%", height: "100%" } : { display: 'none' };
      return _react2.default.createElement(
        'div',
        { style: divStyle, key: 'a' + index },
        comp
      );
    });
  };

  this.getSelectedTabIndex = function () {
    return _this2.state.selectedTabIndex;
  };
}, _temp);
exports.default = TabPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\TabPane.js.map