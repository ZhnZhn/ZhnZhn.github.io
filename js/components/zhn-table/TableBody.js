"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _toLink = _interopRequireDefault(require("../zhn/toLink"));

var _tableFn = require("./tableFn");

var _Style = require("./Style");

var _jsxRuntime = require("react/jsx-runtime");

const _isFn = fn => typeof fn === 'function';

const _crLinkEl = (id, title, fn) => {
  const _href = _isFn(fn) ? fn(id, title) : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    className: _Style.CL_LINK,
    href: (0, _toLink.default)(_href),
    children: title
  });
};

const _crTdStyle = (r, h) => {
  const {
    pn,
    style,
    isR
  } = h,
        v = r[pn],
        _tdStyle = (0, _tableFn.crTdStyle)({
    v,
    isR
  }),
        tdStyle = (r.style || {})[pn];

  return { ...style,
    ..._tdStyle,
    ...tdStyle
  };
};

const _crTdElOrTitle = (r, h, numberFormat, valueToHref) => {
  const {
    pn,
    isHref
  } = h,
        v = r[pn],
        _v = (0, _tableFn.toFormatValue)({
    h,
    v,
    fn: numberFormat
  });

  return isHref ? _crLinkEl(r.id, _v, valueToHref) : _v;
};

const _renderRows = props => {
  const {
    headers,
    rows,
    tableFn
  } = props,
        {
    numberFormat,
    valueToHref
  } = tableFn || {};
  return rows.map(r => {
    const _rId = r.id,
          _elTds = headers.map((h, hIndex) => {
      if (h.isHide) {
        return null;
      }

      const _key = _rId + "_" + hIndex,
            _style = _crTdStyle(r, h),
            _elOrTitle = _crTdElOrTitle(r, h, numberFormat, valueToHref);

      return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        role: "cell",
        style: { ..._Style.S_TD,
          ..._style
        },
        children: _elOrTitle
      }, _key);
    }).filter(Boolean);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
      role: "row",
      children: _elTds
    }, _rId);
  });
};

const TableBody = props => /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
  children: _renderRows(props)
});

var _default = TableBody;
exports.default = _default;
//# sourceMappingURL=TableBody.js.map