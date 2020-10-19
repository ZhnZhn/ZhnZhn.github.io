"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));

var _SvgMore = _interopRequireDefault(require("../zhn/SvgMore"));

var _Style = _interopRequireDefault(require("./Style"));

var _tableFn = _interopRequireDefault(require("./tableFn"));

var C = {
  UP: 'UP',
  DOWN: 'DOWN',
  ASC: 'ascending',
  DESC: 'descending'
};

var ThMore = function ThMore(_ref) {
  var name = _ref.name,
      onMenuMore = _ref.onMenuMore;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMore["default"], {
      style: _Style["default"].BT_SVG_MORE,
      svgStyle: _Style["default"].SVG_MORE,
      onClick: onMenuMore
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _Style["default"].TH_MORE_SPAN,
      children: name
    })]
  });
};

var _renderHeader = function _renderHeader(props, _hThKeyDown) {
  var gridId = props.gridId,
      thMoreStyle = props.thMoreStyle,
      headers = props.headers,
      sortBy = props.sortBy,
      sortTo = props.sortTo,
      onSort = props.onSort,
      onMenuMore = props.onMenuMore;
  return headers.map(function (h, hIndex) {
    if (h.isHide) {
      return null;
    }

    var name = h.name,
        pn = h.pn,
        _FN$crAppearance = _tableFn["default"].crAppearance({
      S: _Style["default"],
      C: C,
      pn: pn,
      name: name,
      sortBy: sortBy,
      sortTo: sortTo
    }),
        style = _FN$crAppearance.style,
        ariaSort = _FN$crAppearance.ariaSort,
        ariaLabel = _FN$crAppearance.ariaLabel,
        _nameOrEl = hIndex === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ThMore, {
      name: name,
      onMenuMore: onMenuMore
    }) : name,
        _thStyle = hIndex === 0 ? (0, _extends2["default"])({}, thMoreStyle, style) : style;

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
      style: (0, _extends2["default"])({}, _Style["default"].TH, _thStyle),
      rowSpan: "1",
      colSpan: "1",
      tabIndex: "0",
      "arial-controls": gridId,
      "aria-label": ariaLabel,
      "aria-sort": ariaSort,
      onClick: function onClick() {
        return onSort(pn);
      },
      onKeyDown: function onKeyDown(event) {
        return _hThKeyDown(event, pn);
      },
      children: _nameOrEl
    }, h.name);
  }).filter(Boolean);
};

var TableHead = function TableHead(props) {
  var _hThKeyEnter = function _hThKeyEnter(evt, pn) {
    if ((0, _isKeyEnter["default"])(evt)) {
      props == null ? void 0 : props.onSort(pn);
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
    style: _Style["default"].THEAD,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
      children: _renderHeader(props, _hThKeyEnter)
    })
  });
};
/*
TableHead.propTypes = {
  gridId: PropTypes.string,
  thMoreStyle: PropTypes.object,
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
  sortBy: PropTypes.string,
  sortTo: PropTypes.string,
  onSort: PropTypes.func,
  onMenuMore: PropTypes.func
}
*/


var _default = TableHead;
exports["default"] = _default;
//# sourceMappingURL=TableHead.js.map