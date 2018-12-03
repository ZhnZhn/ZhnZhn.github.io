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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuTitle = require('./MenuTitle');

var _MenuTitle2 = _interopRequireDefault(_MenuTitle);

var _MenuItemList = require('./MenuItemList');

var _MenuItemList2 = _interopRequireDefault(_MenuItemList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuPage = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(MenuPage, _Component);

  function MenuPage() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuPage.__proto__ || Object.getPrototypeOf(MenuPage)).call.apply(_ref, [this].concat(args))), _this), _this._onRegTitle = function (n) {
      return _this._titleNode = n;
    }, _this._onRegFirst = function (n) {
      return _this._firstNode = n;
    }, _this._focusTitle = function () {
      return _this._titleNode.focus();
    }, _this._focusFirst = function () {
      return _this._firstNode.focus();
    }, _this._focus = function () {
      var _this$props = _this.props,
          pageCurrent = _this$props.pageCurrent,
          pageNumber = _this$props.pageNumber;

      if (pageCurrent === pageNumber) {
        if (_this._titleNode) {
          setTimeout(_this._focusTitle, 1000);
        } else if (_this._firstNode) {
          setTimeout(_this._focusFirst, 1000);
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /*
  static propTypes = {
    title: PropTypes.string,
    pageNumber: PropTypes.number,
    items: PropTypes.arrayOf(
       PropTypes.shapeOf({
          name: PropTypes.string,
          type: PropTypes.string,
          id: PropTypes.string,
          onClick: PropTypes.func
       })
    ),
    onNextPage: PropTypes.func,
    onPrevPage: PropTypes.func,
    onClose: PropTypes.func
  }
  */

  (0, _createClass3.default)(MenuPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          title = _props.title,
          items = _props.items,
          baseTitleCl = _props.baseTitleCl,
          itemCl = _props.itemCl,
          pageNumber = _props.pageNumber,
          onNextPage = _props.onNextPage,
          onPrevPage = _props.onPrevPage,
          onClose = _props.onClose,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(_MenuTitle2.default, {
          baseTitleCl: baseTitleCl,
          title: title,
          pageNumber: pageNumber,
          onPrevPage: onPrevPage,
          onReg: this._onRegTitle
        }),
        _react2.default.createElement(_MenuItemList2.default, {
          items: items,
          itemCl: itemCl || baseTitleCl,
          pageNumber: pageNumber,
          onNextPage: onNextPage,
          onReg: this._onRegFirst,
          onClose: onClose
        }),
        children
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props !== prevProps) {
        this._focus();
      }
    }
  }]);
  return MenuPage;
}(_react.Component), _class.defaultProps = {
  items: []
}, _temp2);
exports.default = MenuPage;
//# sourceMappingURL=MenuPage.js.map