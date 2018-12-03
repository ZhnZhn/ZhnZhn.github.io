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

var _MenuAriaItem = require('./MenuAriaItem');

var _MenuAriaItem2 = _interopRequireDefault(_MenuAriaItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SUB_MENU = 'sub';

var S = {
  ITEM: {
    position: 'relative'
  },
  NEXT_PAGE: {
    position: 'absolute',
    display: 'inline-block',
    top: 0,
    right: '4px',
    color: 'inherit',
    padding: '1px 16px 1px 0px',
    fontWeight: 'bold'
  }
};

var _fClick = function _fClick(_ref) {
  var isClose = _ref.isClose,
      onClick = _ref.onClick,
      onClose = _ref.onClose;

  return typeof onClick === 'function' ? isClose ? function () {
    onClick();onClose();
  } : onClick : void 0;
};

var NextPageArrow = function NextPageArrow(_ref2) {
  var type = _ref2.type;

  if (type !== SUB_MENU) return null;

  return _react2.default.createElement(
    'span',
    { style: S.NEXT_PAGE },
    '>'
  );
};

var MenuItemList = function (_Component) {
  (0, _inherits3.default)(MenuItemList, _Component);

  function MenuItemList() {
    var _ref3;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuItemList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref3 = MenuItemList.__proto__ || Object.getPrototypeOf(MenuItemList)).call.apply(_ref3, [this].concat(args))), _this), _this._renderItems = function () {
      var _this$props = _this.props,
          items = _this$props.items,
          itemCl = _this$props.itemCl,
          pageNumber = _this$props.pageNumber,
          onNextPage = _this$props.onNextPage,
          onReg = _this$props.onReg,
          onClose = _this$props.onClose;

      return items.map(function (item, index) {
        var cn = item.cn,
            name = item.name,
            type = item.type,
            id = item.id,
            isClose = item.isClose,
            onClick = item.onClick,
            _onClick = type === SUB_MENU ? onNextPage.bind(null, id, name, pageNumber) : _fClick({ isClose: isClose, onClick: onClick, onClose: onClose }),
            _onReg = index === 0 ? onReg : void 0;

        return _react2.default.createElement(
          _MenuAriaItem2.default,
          {
            key: name,
            className: cn || itemCl,
            style: S.ITEM,
            onClick: _onClick,
            onReg: _onReg
          },
          _react2.default.createElement(
            'span',
            null,
            name
          ),
          _react2.default.createElement(NextPageArrow, { type: type })
        );
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /*
  static propTypes = {
    items: PropTypes.array,
    pageNumber: PropTypes.number,
    onNextPage: PropTypes.func,
    onReg: PropTypes.func
  }
  */

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