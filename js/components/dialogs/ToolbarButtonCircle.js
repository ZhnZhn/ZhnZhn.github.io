'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _ButtonCircle = require('../zhn/ButtonCircle');

var _ButtonCircle2 = _interopRequireDefault(_ButtonCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE = {
  ROW: {
    paddingTop: '4px',
    paddingBottom: '8px'
  },
  BUTTON_CIRCLE: {
    marginLeft: '20px'
  }
};

//const ToolbarButtonCircle = React.createClass({

var ToolbarButtonCircle = function (_Component) {
  _inherits(ToolbarButtonCircle, _Component);

  function ToolbarButtonCircle() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToolbarButtonCircle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToolbarButtonCircle.__proto__ || Object.getPrototypeOf(ToolbarButtonCircle)).call.apply(_ref, [this].concat(args))), _this), _this._renderButtons = function () {
      var buttons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return buttons.map(function (button, index) {
        var caption = button.caption,
            onClick = button.onClick;

        return _react2.default.createElement(_ButtonCircle2.default, {
          key: caption + index,
          caption: caption,
          style: STYLE.BUTTON_CIRCLE,
          onClick: onClick
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToolbarButtonCircle, [{
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
        _Row2.default,
        { style: STYLE.ROW },
        this._renderButtons(buttons)
      );
    }
  }]);

  return ToolbarButtonCircle;
}(_react.Component);
//});

exports.default = ToolbarButtonCircle;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\ToolbarButtonCircle.js.map