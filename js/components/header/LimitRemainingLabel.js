'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  LABEL: {
    display: 'inline-block',
    color: '#2f7ed8',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var LimitRemainingLabel = _react2.default.createClass({
  displayName: 'LimitRemainingLabel',
  getInitialState: function getInitialState() {
    return {
      value: ''
    };
  },
  componentWillMount: function componentWillMount() {
    var store = this.props.store;

    this.unsubscribe = store.listenWithLimitRemaining(this._onStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(value) {
    if (!(value == null)) {
      this.setState({ value: value });
    }
  },
  render: function render() {
    var style = this.props.style;
    var value = this.state.value;


    return _react2.default.createElement(
      'span',
      { style: Object.assign({}, STYLE.LABEL, style) },
      value
    );
  }
});

exports.default = LimitRemainingLabel;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\LimitRemainingLabel.js.map