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

var S = {
  ITEM: {
    position: 'relative'
  },
  PREV_PAGE: {
    position: 'absolute',
    top: 0,
    left: '16px'
  },
  TITLE: {
    paddingLeft: '16px'
  }
};

var MenuTitle = function (_Component) {
  (0, _inherits3.default)(MenuTitle, _Component);

  function MenuTitle() {
    (0, _classCallCheck3.default)(this, MenuTitle);
    return (0, _possibleConstructorReturn3.default)(this, (MenuTitle.__proto__ || Object.getPrototypeOf(MenuTitle)).apply(this, arguments));
  }

  (0, _createClass3.default)(MenuTitle, [{
    key: 'render',

    /*
    static propTypes = {
      baseTitleCl: PropTypes.string,
      title: PropTypes.string,
      pageNumber: PropTypes.number,
      onPrevPage: PropTypes.func,
      onReg: PropTypes.func
    }
    */

    value: function render() {
      var _props = this.props,
          baseTitleCl = _props.baseTitleCl,
          title = _props.title,
          pageNumber = _props.pageNumber,
          onPrevPage = _props.onPrevPage,
          onReg = _props.onReg;

      if (!title) {
        return null;
      }
      return _react2.default.createElement(
        _MenuAriaItem2.default,
        {
          className: baseTitleCl,
          style: S.ITEM,
          onClick: onPrevPage.bind(null, pageNumber),
          onReg: onReg
        },
        _react2.default.createElement(
          'span',
          { style: S.PREV_PAGE },
          '<'
        ),
        _react2.default.createElement(
          'span',
          { style: S.TITLE },
          title
        )
      );
    }
  }]);
  return MenuTitle;
}(_react.Component);

exports.default = MenuTitle;
//# sourceMappingURL=MenuTitle.js.map