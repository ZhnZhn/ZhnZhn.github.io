'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _DialogContainer = require('../zhn-containers/DialogContainer');

var _DialogContainer2 = _interopRequireDefault(_DialogContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL_ROOT = "hrz-container";
//import PropTypes from "prop-types";

var BrowserContainer = function (_Component) {
  (0, _inherits3.default)(BrowserContainer, _Component);

  function BrowserContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BrowserContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BrowserContainer.__proto__ || Object.getPrototypeOf(BrowserContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      elBrowsers: []
    }, _this._onStore = function (actionType, data) {
      if (actionType === _this.props.initBrowserAction) {
        _this.setState(function (prevState) {
          return {
            elBrowsers: [data].concat((0, _toConsumableArray3.default)(prevState.elBrowsers))
          };
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /*
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func
    }),
    initBrowserAction: PropTypes.string,
    showDialogAction: PropTypes.string,
    onCloseDialog: PropTypes.func
  }
  */

  (0, _createClass3.default)(BrowserContainer, [{
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
    key: 'render',
    value: function render() {
      var _props = this.props,
          store = _props.store,
          showDialogAction = _props.showDialogAction,
          onCloseDialog = _props.onCloseDialog,
          elBrowsers = this.state.elBrowsers;


      return _react2.default.createElement(
        'div',
        { className: CL_ROOT },
        elBrowsers.map(function (Comp) {
          return _react2.default.cloneElement(Comp);
        }),
        _react2.default.createElement(_DialogContainer2.default, {
          maxDialog: 3,
          store: store,
          showAction: showDialogAction,
          onCloseDialog: onCloseDialog
        })
      );
    }
  }]);
  return BrowserContainer;
}(_react.Component);

exports.default = BrowserContainer;
//# sourceMappingURL=BrowserContainer.js.map