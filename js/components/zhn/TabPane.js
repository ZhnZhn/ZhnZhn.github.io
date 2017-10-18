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

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  (0, _inherits3.default)(TabPane, _Component);

  function TabPane(props) {
    (0, _classCallCheck3.default)(this, TabPane);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).call(this));

    _initialiseProps.call(_this);

    _this.isUpdateInit = props.isUpdateInit;

    var components = props.children.map(function (tab, index) {
      return _react2.default.cloneElement(tab.props.children, { key: 'comp' + index });
    });
    _this.state = {
      selectedTabIndex: 0,
      components: components
    };
    return _this;
  }

  (0, _createClass3.default)(TabPane, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.isUpdateInit && this.props !== nextProps) {
        var components = nextProps.children.map(function (tab, index) {
          return _react2.default.cloneElement(tab.props.children, { key: 'comp' + index });
        });
        this.setState({ components: components });
      }
    }
  }, {
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
process.env.NODE_ENV !== "production" ? TabPane.propTypes = {
  isUpdateInit: _propTypes2.default.bool,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  children: _propTypes2.default.arrayOf(_propTypes2.default.node)
} : void 0;
exports.default = TabPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\TabPane.js.map