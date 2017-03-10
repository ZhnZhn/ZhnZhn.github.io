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

var _LabelNew = require('./LabelNew');

var _LabelNew2 = _interopRequireDefault(_LabelNew);

var _MenuBadge = require('./MenuBadge');

var _MenuBadge2 = _interopRequireDefault(_MenuBadge);

var _OpenClose = require('./OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuPart = function (_Component) {
  (0, _inherits3.default)(MenuPart, _Component);

  function MenuPart() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuPart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuPart.__proto__ || Object.getPrototypeOf(MenuPart)).call.apply(_ref, [this].concat(args))), _this), _this._renderMenuItems = function (items) {
      return items.map(function (item, index) {
        var menuBadgeEl = item.counter !== 0 ? _react2.default.createElement(_MenuBadge2.default, {
          counter: item.counter,
          isOpen: item.isOpen,
          onClick: item.onBadgeClick,
          onBadgeClose: item.onBadgeClose
        }) : null;
        var labelNewEl = item.isNew ? _react2.default.createElement(_LabelNew2.default, null) : null;
        return _react2.default.createElement(
          'div',
          {
            key: index,
            className: 'row__topic not-selected',
            onClick: item.onClick
          },
          item.title,
          menuBadgeEl,
          labelNewEl
        );
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuPart, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          isInitClose = _props.isInitClose,
          items = _props.items;

      return _react2.default.createElement(
        _OpenClose2.default,
        { caption: caption, isClose: isInitClose },
        this._renderMenuItems(items)
      );
    }
  }]);
  return MenuPart;
}(_react.Component);

exports.default = MenuPart;
//# sourceMappingURL=MenuPart.js.map