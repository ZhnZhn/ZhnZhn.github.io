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

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _ButtonCircle = require('../zhn/ButtonCircle');

var _ButtonCircle2 = _interopRequireDefault(_ButtonCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROW: {
    paddingTop: '4px',
    paddingBottom: '8px'
  },
  BUTTON_CIRCLE: {
    marginLeft: '20px'
  }
};

var ToolbarButtonCircle = function (_Component) {
  (0, _inherits3.default)(ToolbarButtonCircle, _Component);

  function ToolbarButtonCircle() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ToolbarButtonCircle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ToolbarButtonCircle.__proto__ || Object.getPrototypeOf(ToolbarButtonCircle)).call.apply(_ref, [this].concat(args))), _this), _this._renderButtons = function () {
      var buttons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return buttons.map(function (button, index) {
        var caption = button.caption,
            title = button.title,
            onClick = button.onClick;

        return _react2.default.createElement(_ButtonCircle2.default, {
          key: caption + index,
          caption: caption,
          title: title,
          style: STYLE.BUTTON_CIRCLE,
          onClick: onClick
        });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ToolbarButtonCircle, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.buttons === this.props.buttons) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var buttons = this.props.buttons;

      return _react2.default.createElement(
        _Row2.default.Plain,
        { style: STYLE.ROW },
        this._renderButtons(buttons)
      );
    }
  }]);
  return ToolbarButtonCircle;
}(_react.Component);

exports.default = ToolbarButtonCircle;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\ToolbarButtonCircle.js.map