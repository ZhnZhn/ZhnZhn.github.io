'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartStore = require('../../flux/stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    display: 'flex',
    flexDirection: 'row'
  }
};

var ComponentHrzContainer = _react2.default.createClass({
  displayName: 'ComponentHrzContainer',
  getInitialState: function getInitialState() {
    return {
      containers: []
    };
  },
  componentWillMount: function componentWillMount() {
    this.unsubscribe = _ChartStore2.default.listen(this._onStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(actionType, data) {
    if (actionType === _ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART) {
      this.state.containers.unshift(data);
      this.setState(this.state);
    }
  },
  _renderContainers: function _renderContainers(containers) {
    return containers.map(function (container, index) {
      return container;
    });
  },
  render: function render() {
    var containers = this.state.containers;

    return _react2.default.createElement(
      'div',
      { className: 'hrz-container' },
      this._renderContainers(containers)
    );
  }
});

exports.default = ComponentHrzContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-container\ComponentHrzContainer.js.map