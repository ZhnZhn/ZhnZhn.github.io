"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _tableFn = _interopRequireDefault(require("./tableFn"));

var _Style = _interopRequireDefault(require("./Style"));

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crLinkEl = function _crLinkEl(id, title, fn) {
  var _href = _isFn(fn) ? fn(id) : void 0;

  return _react["default"].createElement("a", {
    className: _Style["default"].CL_LINK,
    href: _href
  }, title);
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

  return [_key, (0, _extends2["default"])({}, style, {}, _tdStyle), _elOrTitle];
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

      return _react["default"].createElement("td", {
        key: _key,
        style: (0, _extends2["default"])({}, _Style["default"].TD, {}, _style)
      }, _elOrTitle);
    }).filter(Boolean);

    return _react["default"].createElement("tr", {
      key: _rId,
      role: "row"
    }, _elTds);
  });
};

var TableBody = function TableBody(props) {
  return _react["default"].createElement("tbody", null, _renderRows(props));
};

var _default = TableBody;
exports["default"] = _default;
//# sourceMappingURL=TableBody.js.map