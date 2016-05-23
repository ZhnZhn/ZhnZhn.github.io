'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ProgressLine = require('../zhn/ProgressLine');

var _ProgressLine2 = _interopRequireDefault(_ProgressLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Colors = {
  LOADING: '#2F7ED8',
  FAILED: 'rgb(237, 88, 19)'
};

var ProgressLoading = _react2.default.createClass({
  displayName: 'ProgressLoading',
  getInitialState: function getInitialState() {
    return {
      completed: 0,
      color: Colors.LOADING
    };
  },
  componentDidMount: function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(actionType, option) {
    if (actionType === _ChartActions.ChartActionTypes.LOAD_STOCK) {
      this.setState({ completed: 35, color: Colors.LOADING });
    } else if (actionType === _ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED || actionType === _ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART || actionType === _ChartActions.ChartActionTypes.LOAD_STOCK_ADDED) {
      this.setState({ completed: 100, color: Colors.LOADING });
    } else if (actionType === _ChartActions.ChartActionTypes.LOAD_STOCK_FAILED) {
      this.setState({ completed: 100, color: Colors.FAILED });
    }
  },
  render: function render() {
    var _state = this.state;
    var completed = _state.completed;
    var color = _state.color;

    return _react2.default.createElement(_ProgressLine2.default, {
      height: 3,
      color: color,
      completed: completed
    });
  }
});

exports.default = ProgressLoading;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\ProgressLoading.js.map