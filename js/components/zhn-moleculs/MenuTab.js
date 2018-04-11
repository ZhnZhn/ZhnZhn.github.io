'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'ELEMENT';

var CL = {
  SHOW: 'button-tab button-tab--show not-selected',
  NOT_SHOW: 'button-tab not-selected',
  ARROW: 'arrow-down'
};

var MenuTab = function (_Component) {
  (0, _inherits3.default)(MenuTab, _Component);

  function MenuTab() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuTab.__proto__ || Object.getPrototypeOf(MenuTab)).call.apply(_ref, [this].concat(args))), _this), _this._refBtNode = function (node) {
      return _this.btNode = node;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuTab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (typeof onReg === 'function') {
        onReg(this.btNode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          isShow = _props.isShow,
          caption = _props.caption,
          style = _props.style,
          children = _props.children,
          onClick = _props.onClick,
          TS = theme.getStyle(TH_ID),
          _rootClass = isShow ? CL.SHOW : CL.NOT_SHOW;

      return _react2.default.createElement(
        'div',
        {
          className: _rootClass,
          style: (0, _extends3.default)({}, style, TS.BG)
        },
        _react2.default.createElement(
          'div',
          {
            ref: this._refBtNode,
            onClick: onClick
          },
          _react2.default.createElement(
            'span',
            null,
            caption
          ),
          _react2.default.createElement('span', { className: CL.ARROW })
        ),
        children
      );
    }
  }]);
  return MenuTab;
}(_react.Component);

exports.default = (0, _withTheme2.default)(MenuTab);
//# sourceMappingURL=MenuTab.js.map