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

var _MenuSubItem = require('./MenuSubItem');

var _MenuSubItem2 = _interopRequireDefault(_MenuSubItem);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItemList = function (_Component) {
  (0, _inherits3.default)(MenuItemList, _Component);

  function MenuItemList() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuItemList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuItemList.__proto__ || Object.getPrototypeOf(MenuItemList)).call.apply(_ref, [this].concat(args))), _this), _this._refFirst = function (n) {
      return _this._firstNode = n;
    }, _this._renderItems = function () {
      var _this$props = _this.props,
          pageNumber = _this$props.pageNumber,
          _this$props$model = _this$props.model,
          model = _this$props$model === undefined ? [] : _this$props$model,
          CL = _this$props.CL,
          onClickDynamic = _this$props.onClickDynamic,
          onClickQuandl = _this$props.onClickQuandl,
          onClickNext = _this$props.onClickNext,
          onReg = _this$props.onReg;

      return model.map(function (item, index) {
        var type = item.type,
            id = item.id,
            title = item.title,
            _onReg = index === 0 ? onReg : void 0;

        if (type === 'sub') {
          return _react2.default.createElement(_MenuSubItem2.default, {
            key: id,
            CL: CL,
            item: item,
            onClick: onClickNext.bind(null, id, title, pageNumber),
            onReg: _onReg
          });
        }
        return _react2.default.createElement(_MenuItem2.default, {
          key: id,
          CL: CL,
          item: item,
          onClickDynamic: onClickDynamic,
          onClickQuandl: onClickQuandl
        });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuItemList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _react.Fragment,
        null,
        this._renderItems()
      );
    }
  }]);
  return MenuItemList;
}(_react.Component);

exports.default = MenuItemList;
//# sourceMappingURL=MenuItemList.js.map