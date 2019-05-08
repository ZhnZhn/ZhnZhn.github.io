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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var CL = "bt-sub-item";

var S = {
  ACTIVE: {
    fontWeight: 'bold'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SubMenuItem = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(SubMenuItem, _Component);

  function SubMenuItem(props) {
    (0, _classCallCheck3.default)(this, SubMenuItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SubMenuItem.__proto__ || Object.getPrototypeOf(SubMenuItem)).call(this, props));

    _this._hClick = function () {
      _this.props.onClick();
      _this.setState(function (prev) {
        return {
          isActive: !prev.isActive
        };
      });
    };

    _this.state = {
      isActive: props.initialIsActive
    };
    return _this;
  }
  /*
  static propTypes = {
    caption: PropTypes.string,
    initialIsActive: PropTypes.bool,
    isNotActive: PropTypes.bool,
    onClick: PropTypes.func
  }
  */


  (0, _createClass3.default)(SubMenuItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          isNotActive = _props.isNotActive,
          onClick = _props.onClick;

      if (!_isFn(onClick)) {
        return null;
      }

      var isActive = this.state.isActive,
          _style = isActive && !isNotActive ? S.ACTIVE : null;


      return _react2.default.createElement(
        'button',
        {
          className: CL,
          style: _style,
          onClick: this._hClick
        },
        caption
      );
    }
  }]);
  return SubMenuItem;
}(_react.Component), _class.defaultProps = {
  initialIsActive: false
}, _temp);
exports.default = SubMenuItem;
//# sourceMappingURL=SubMenuItem.js.map