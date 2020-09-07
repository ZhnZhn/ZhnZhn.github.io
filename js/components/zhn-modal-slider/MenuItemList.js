"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _MenuAriaItem = _interopRequireDefault(require("./MenuAriaItem"));

var SUB_MENU = 'sub';
var S = {
  ITEM: {
    position: 'relative'
  },
  NEXT_PAGE: {
    display: 'inline-block',
    position: 'absolute',
    top: 0,
    right: 4,
    color: 'inherit',
    padding: '1px 16px 1px 0px',
    fontWeight: 'bold'
  }
};

var _fClick = function _fClick(_ref2) {
  var isClose = _ref2.isClose,
      onClick = _ref2.onClick,
      onClose = _ref2.onClose;
  return typeof onClick === 'function' ? isClose ? function () {
    onClick();
    onClose();
  } : onClick : void 0;
};

var NextPageArrow = function NextPageArrow(_ref3) {
  var type = _ref3.type;
  if (type !== SUB_MENU) return null;
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: S.NEXT_PAGE
  }, ">");
};

var MenuItemList = /*#__PURE__*/_react["default"].forwardRef(function (_ref4, ref) {
  var items = _ref4.items,
      itemCl = _ref4.itemCl,
      pageNumber = _ref4.pageNumber,
      onNextPage = _ref4.onNextPage,
      onClose = _ref4.onClose;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, items.map(function (item, index) {
    var cn = item.cn,
        name = item.name,
        type = item.type,
        id = item.id,
        isClose = item.isClose,
        onClick = item.onClick,
        _onClick = type === SUB_MENU ? onNextPage.bind(null, id, name, pageNumber) : _fClick({
      isClose: isClose,
      onClick: onClick,
      onClose: onClose
    }),
        _ref = index === 0 ? ref : void 0;

    return /*#__PURE__*/_react["default"].createElement(_MenuAriaItem["default"], {
      key: name,
      ref: _ref,
      className: cn || itemCl,
      style: S.ITEM,
      onClick: _onClick
    }, /*#__PURE__*/_react["default"].createElement("span", null, name), /*#__PURE__*/_react["default"].createElement(NextPageArrow, {
      type: type
    }));
  }));
});
/*
MenuItemList.propTypes = {
  items: PropTypes.array,
  itemCl: PropTypes.string,
  pageNumber: PropTypes.number,  
  onNextPage: PropTypes.func,
  onClose: PropTypes.func
}
*/


var _default = MenuItemList;
exports["default"] = _default;
//# sourceMappingURL=MenuItemList.js.map