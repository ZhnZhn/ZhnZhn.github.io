"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _toLink = _interopRequireDefault(require("../zhn/toLink"));

var _tableFn = _interopRequireDefault(require("./tableFn"));

var _Style = _interopRequireDefault(require("./Style"));

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crLinkEl = function _crLinkEl(id, title, fn) {
  var _href = _isFn(fn) ? fn(id, title) : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    className: _Style["default"].CL_LINK,
    href: (0, _toLink["default"])(_href),
    children: title
  });
};

var _crTdStyle = function _crTdStyle(r, h) {
  var pn = h.pn,
      style = h.style,
      isR = h.isR,
      v = r[pn],
      _tdStyle = _tableFn["default"].crTdStyle({
    S: _Style["default"],
    v: v,
    isR: isR
  }),
      tdStyle = (r.style || {})[pn];

  return (0, _extends2["default"])({}, style, _tdStyle, tdStyle);
};

var _crTdElOrTitle = function _crTdElOrTitle(r, h, numberFormat, valueToHref) {
  var pn = h.pn,
      isHref = h.isHref,
      v = r[pn],
      _v = _tableFn["default"].toFormatValue({
    h: h,
    v: v,
    fn: numberFormat
  });

  return isHref ? _crLinkEl(r.id, _v, valueToHref) : _v;
};

var _renderRows = function _renderRows(props) {
  var headers = props.headers,
      rows = props.rows,
      tableFn = props.tableFn,
      numberFormat = tableFn.numberFormat,
      valueToHref = tableFn.valueToHref;
  return rows.map(function (r) {
    var _rId = r.id,
        _elTds = headers.map(function (h, hIndex) {
      if (h.isHide) {
        return null;
      }

      var _key = _rId + "_" + hIndex,
          _style = _crTdStyle(r, h),
          _elOrTitle = _crTdElOrTitle(r, h, numberFormat, valueToHref);

      return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        role: "cell",
        style: (0, _extends2["default"])({}, _Style["default"].TD, _style),
        children: _elOrTitle
      }, _key);
    }).filter(Boolean);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
      role: "row",
      children: _elTds
    }, _rId);
  });
};

var TableBody = function TableBody(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
    children: _renderRows(props)
  });
};

var _default = TableBody;
exports["default"] = _default;
//# sourceMappingURL=TableBody.js.map