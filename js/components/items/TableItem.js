"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _Table = _interopRequireDefault(require("../zhn-table/Table"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var S = {
  ROOT: {
    paddingBottom: 8
  },
  ROOT_HEADER: {
    position: 'sticky',
    top: -1,
    zIndex: 1,
    willChange: 'transform'
  },
  CAPTION: {
    width: '100%'
  },
  SHOW_HIDE: {
    paddingTop: 8,
    paddingBottom: 8
  },
  DATA_SOURCE: {
    paddingTop: 2,
    paddingLeft: 12,
    color: '#909090',
    fontSize: '11px'
  }
};

var TableItem = function TableItem(_ref) {
  var thMoreStyle = _ref.thMoreStyle,
      config = _ref.config,
      onCloseItem = _ref.onCloseItem;

  var _useToggle = (0, _useToggle2["default"])(true),
      isOpen = _useToggle[0],
      toggleIsOpen = _useToggle[1],
      id = config.id,
      title = config.title,
      headers = config.headers,
      rows = config.rows,
      tableFn = config.tableFn,
      dataSource = config.dataSource,
      dsStyle = config.dsStyle,
      _gridId = "tb_" + id;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: S.ROOT
  }, /*#__PURE__*/_react["default"].createElement(_ItemHeader["default"], {
    isOpen: isOpen,
    rootStyle: S.ROOT_HEADER,
    caption: title,
    captionStyle: S.CAPTION,
    onClick: toggleIsOpen,
    onClose: onCloseItem
  }), /*#__PURE__*/_react["default"].createElement(_ShowHide["default"], {
    isShow: isOpen,
    style: S.SHOW_HIDE
  }, /*#__PURE__*/_react["default"].createElement(_Table["default"], {
    gridId: _gridId,
    thMoreStyle: thMoreStyle,
    headers: headers,
    rows: rows,
    tableFn: tableFn
  }), dataSource && /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.DATA_SOURCE, dsStyle)
  }, dataSource)));
};

var _default = TableItem;
exports["default"] = _default;
//# sourceMappingURL=TableItem.js.map