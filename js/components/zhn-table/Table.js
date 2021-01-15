"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

var _useTable = _interopRequireDefault(require("./useTable"));

var _ModalMenu = _interopRequireDefault(require("./ModalMenu"));

var _TableHead = _interopRequireDefault(require("./TableHead"));

var _TableBody = _interopRequireDefault(require("./TableBody"));

var _Style = _interopRequireDefault(require("./Style"));

//import PropTypes from "prop-types";
var useMenu = _useTable["default"].useMenu,
    useColumn = _useTable["default"].useColumn,
    useSort = _useTable["default"].useSort;

var Table = function Table(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      gridId = _ref.gridId,
      thMoreStyle = _ref.thMoreStyle,
      rows = _ref.rows,
      headers = _ref.headers,
      tableFn = _ref.tableFn;

  var _useToggle = (0, _useToggle2["default"])(true),
      isGridLine = _useToggle[0],
      toogleGridLine = _useToggle[1],
      _useMenu = useMenu(),
      isMenuMore = _useMenu[0],
      toggleMenuMore = _useMenu[1],
      _useColumn = useColumn(headers),
      _headers = _useColumn[0],
      toggleColumn = _useColumn[1],
      _useSort = useSort(rows),
      _useSort$ = _useSort[0],
      _rows = _useSort$._rows,
      sortBy = _useSort$.sortBy,
      sortTo = _useSort$.sortTo,
      sortByPn = _useSort[1],
      _cn = isGridLine ? _Style["default"].CL_GRID : '',
      _tableClassName = _cn + " " + className;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Style["default"].WRAPPER_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalMenu["default"], {
      style: _Style["default"].STYLE_MORE,
      isShow: isMenuMore,
      onClose: toggleMenuMore,
      isGridLine: isGridLine,
      onToggleGrid: toogleGridLine,
      headers: _headers,
      onToggle: toggleColumn
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
      role: "grid",
      id: gridId,
      className: _tableClassName,
      style: _Style["default"].TABLE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TableHead["default"], {
        gridId: gridId,
        thMoreStyle: thMoreStyle,
        headers: _headers,
        sortBy: sortBy,
        sortTo: sortTo,
        onSort: sortByPn,
        onMenuMore: toggleMenuMore
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TableBody["default"], {
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
exports["default"] = _default;
//# sourceMappingURL=Table.js.map