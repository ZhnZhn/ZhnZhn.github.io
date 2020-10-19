"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _tableFn = _interopRequireDefault(require("./tableFn"));

var _Style = _interopRequireDefault(require("./Style"));

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crLinkEl = function _crLinkEl(id, title, fn) {
  var _href = _isFn(fn) ? fn(id, title) : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    className: _Style["default"].CL_LINK,
    href: _href,
    children: title
  });
};

var _crTd = function _crTd(rId, r, h, hIndex, numberFormat, valueToHref) {
  var pn = h.pn,
      style = h.style,
      isR = h.isR,
      isHref = h.isHref,
      _key = rId + hIndex,
      v = r[pn],
      _v = _tableFn["default"].toFormatValue({
    h: h,
    v: v,
    fn: numberFormat
  }),
      _tdStyle = _tableFn["default"].crTdStyle({
    S: _Style["default"],
    v: v,
    isR: isR
  }),
      _elOrTitle = isHref ? _crLinkEl(r.id, _v, valueToHref) : _v;

  return [_key, (0, _extends2["default"])({}, style, _tdStyle), _elOrTitle];
};

var _renderRows = function _renderRows(props) {
  var headers = props.headers,
      rows = props.rows,
      tableFn = props.tableFn,
      numberFormat = tableFn.numberFormat,
      valueToHref = tableFn.valueToHref;
  return rows.map(function (r, rIndex) {
    var _rId = r.id,
        _elTds = headers.map(function (h, hIndex) {
      if (h.isHide) {
        return null;
      }

      var _crTd2 = _crTd(_rId, r, h, hIndex, numberFormat, valueToHref),
          _key = _crTd2[0],
          _style = _crTd2[1],
          _elOrTitle = _crTd2[2];

      return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
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