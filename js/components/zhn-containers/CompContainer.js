"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from 'prop-types';

var CL = "hrz-container";

var CompContainer = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(CompContainer, _Component);

  function CompContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CompContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CompContainer.__proto__ || Object.getPrototypeOf(CompContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      containers: []
    }, _this._onStore = function (actionType, Comp) {
      if (actionType === _this.props.addAction) {
        _this.setState(function (prevState) {
          prevState.containers.unshift(Comp);
          return prevState;
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /*
  static propTypes = {
    className: PropTypes.string,
    store: PropTypes.shape({
      listen: PropTypes.func
    }),
    addAction: PropTypes.string
  }
  */


  (0, _createClass3.default)(CompContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: this.props.className },
        this.state.containers
      );
    }
  }]);
  return CompContainer;
}(_react.Component), _class.defaultProps = {
  className: CL
}, _temp2);
exports.default = CompContainer;
//# sourceMappingURL=CompContainer.js.map