'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var TabPane = _react2.default.createClass({
  displayName: 'TabPane',

  getInitialState: function getInitialState() {
    var components = this.props.children.map(function (tab, index) {
      return _react2.default.cloneElement(tab.props.children, { key: 'comp' + index });
    });

    return {
      selectedTabIndex: 0,
      components: components
    };
  },
  _handlerClickTab: function _handlerClickTab(index) {
    this.setState({ selectedTabIndex: index });
  },
  _renderTabs: function _renderTabs(children) {
    var _this = this;

    var selectedTabIndex = this.state.selectedTabIndex;

    return children.map(function (tab, index) {
      var isSelected = index === selectedTabIndex ? true : false;
      return _react2.default.cloneElement(tab, { key: index, onClick: _this._handlerClickTab.bind(null, index), isSelected: isSelected });
    });
  },
  _renderComponents: function _renderComponents(children) {
    var selectedTabIndex = this.state.selectedTabIndex;

    return children.map(function (tab, index) {
      var divStyle = index === selectedTabIndex ? { display: 'block', width: "100%", height: "100%" } : { display: 'none' };
      var comp = _react2.default.cloneElement(tab.props.children, { key: index, ref: 'comp' + index });
      return _react2.default.createElement(
        'div',
        { style: divStyle },
        comp
      );
    });
  },
  _renderComponents2: function _renderComponents2() {
    var _state = this.state;
    var selectedTabIndex = _state.selectedTabIndex;
    var components = _state.components;

    return components.map(function (comp, index) {
      var divStyle = index === selectedTabIndex ? { display: 'block', width: "100%", height: "100%" } : { display: 'none' };
      return _react2.default.createElement(
        'div',
        { style: divStyle, key: 'a' + index },
        comp
      );
    });
  },
  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var width = _props.width;
    var height = _props.height;

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
        this._renderComponents2()
      )
    );
  },
  getSelectedTabIndex: function getSelectedTabIndex() {
    return this.state.selectedTabIndex;
  }
});

exports.default = TabPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\TabPane.js.map