"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _Table = _interopRequireDefault(require("../zhn-table/Table"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROOT = {
  paddingBottom: 8
},
      S_HEADER = {
  position: 'sticky',
  top: -1,
  zIndex: 1,
  willChange: 'transform'
},
      S_CAPTION = {
  width: '100%'
},
      S_SHOW_HIDE = {
  padding: '8px 0'
},
      S_DATA_SOURCE = {
  padding: '2px 0 0 12px',
  color: '#909090',
  fontSize: '11px'
};

const TableItem = _ref => {
  let {
    thMoreStyle,
    config,
    onCloseItem
  } = _ref;

  const [isOpen, toggleIsOpen] = (0, _useToggle.default)(true),
        {
    id,
    title,
    headers,
    rows,
    tableFn,
    dataSource,
    dsStyle
  } = config,
        _gridId = "tb_" + id;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemHeader.default, {
      isOpen: isOpen,
      style: S_HEADER,
      caption: title,
      captionStyle: S_CAPTION,
      onClick: toggleIsOpen,
      onClose: onCloseItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ShowHide.default, {
      isShow: isOpen,
      style: S_SHOW_HIDE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Table.default, {
        gridId: _gridId,
        thMoreStyle: thMoreStyle,
        headers: headers,
        rows: rows,
        tableFn: tableFn
      }), dataSource && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: { ...S_DATA_SOURCE,
          ...dsStyle
        },
        children: dataSource
      })]
    })]
  });
};

var _default = TableItem;
exports.default = _default;
//# sourceMappingURL=TableItem.js.map