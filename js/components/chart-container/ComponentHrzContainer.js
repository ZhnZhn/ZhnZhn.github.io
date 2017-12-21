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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentHrzContainer = function (_Component) {
  (0, _inherits3.default)(ComponentHrzContainer, _Component);

  function ComponentHrzContainer(props) {
    (0, _classCallCheck3.default)(this, ComponentHrzContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComponentHrzContainer.__proto__ || Object.getPrototypeOf(ComponentHrzContainer)).call(this));

    _this._onStore = function (actionType, data) {
      if (actionType === _this.props.addAction) {
        _this.setState(function (prevState) {
          prevState.containers.unshift(data);
          return prevState;
        });
      }
    };

    _this.state = {
      containers: []
    };
    return _this;
  }

  (0, _createClass3.default)(ComponentHrzContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var store = this.props.store;

      this.unsubscribe = store.listen(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: '_renderContainers',
    value: function _renderContainers(containers) {
      return containers.map(function (container) {
        return container;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var containers = this.state.containers;

      return _react2.default.createElement(
        'div',
        { className: 'hrz-container' },
        this._renderContainers(containers)
      );
    }
  }]);
  return ComponentHrzContainer;
}(_react.Component);

ComponentHrzContainer.propTypes = process.env.NODE_ENV !== "production" ? {
  store: _propTypes2.default.shape({
    listen: _propTypes2.default.func
  }),
  addAction: _propTypes2.default.string
} : {};
exports.default = ComponentHrzContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-container\ComponentHrzContainer.js.map