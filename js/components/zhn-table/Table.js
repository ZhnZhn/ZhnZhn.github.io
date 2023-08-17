"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useTable = require("./useTable");
var _ModalMenu = _interopRequireDefault(require("./ModalMenu"));
var _TableHead = _interopRequireDefault(require("./TableHead"));
var _TableBody = _interopRequireDefault(require("./TableBody"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const Table = _ref => {
  let {
    className,
    gridId,
    thMoreStyle,
    rows,
    headers,
    tableFn
  } = _ref;
  const [isGridLine, toogleGridLine] = (0, _useToggle.default)(true),
    [isMenuMore, toggleMenuMore] = (0, _useTable.useMenu)(),
    [_headers, toggleColumn] = (0, _useTable.useColumn)(headers),
    [{
      _rows,
      sortBy,
      sortTo
    }, sortByPn] = (0, _useTable.useSort)(rows),
    _tableCn = (0, _styleFn.crCn)([isGridLine, _Style.CL_GRID], className);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Style.S_WRAPPER_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenu.default, {
      style: _Style.S_MENU_MORE,
      isShow: isMenuMore,
      onClose: toggleMenuMore,
      isGridLine: isGridLine,
      onToggleGrid: toogleGridLine,
      headers: _headers,
      onToggle: toggleColumn
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
      role: "grid",
      id: gridId,
      className: _tableCn,
      style: _Style.S_TABLE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TableHead.default, {
        gridId: gridId,
        thMoreStyle: thMoreStyle,
        headers: _headers,
        sortBy: sortBy,
        sortTo: sortTo,
        onSort: sortByPn,
        onMenuMore: toggleMenuMore
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TableBody.default, {
        headers: _headers,
        rows: _rows,
        tableFn: tableFn
      })]
    })]
  });
};

/*
Table.propTypes = {
  className: PropTypes.string,
  gridId: PropTypes.string,
  thMoreStyle: PropTypes.object,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ),
  headers: PropTypes.arrayOf(
     PropTypes.shape({
      isHide: PropTypes.bool,
      name: PropTypes.string,
      pn: PropTypes.string,
      isR: PropTypes.bool,
      isF: PropTypes.bool,
      isHref: PropTypes.bool,
      style: PropTypes.object
    })
  ),
  tableFn: PropTypes.shape({
     numberFormat: PropTypes.func,
     valueToHref: PropTypes.func
  })
}
*/
var _default = Table;
exports.default = _default;
//# sourceMappingURL=Table.js.map