"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));
var _SvgMore = _interopRequireDefault(require("../zhn/SvgMore"));
var _tableFn = require("./tableFn");
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const C = {
  UP: 'UP',
  DOWN: 'DOWN',
  ASC: 'ascending',
  DESC: 'descending'
};
const ThMore = _ref => {
  let {
    name,
    onMenuMore
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMore.default, {
      style: _Style.S_BT_SVG_MORE,
      svgStyle: (0, _Style.crSvgMoreStyle)(),
      onClick: onMenuMore
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _Style.S_TH_MORE_SPAN,
      children: name
    })]
  });
};
const _renderHeader = (props, _hThKeyDown) => {
  const {
    gridId,
    thMoreStyle,
    headers,
    sortBy,
    sortTo,
    onSort,
    onMenuMore
  } = props;
  return headers.map((h, hIndex) => {
    if (h.isHide) {
      return null;
    }
    const {
        name,
        pn
      } = h,
      {
        style,
        ariaSort,
        ariaLabel
      } = (0, _tableFn.crAppearance)({
        C,
        pn,
        name,
        sortBy,
        sortTo
      }),
      _nameOrEl = hIndex === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ThMore, {
        name: name,
        onMenuMore: onMenuMore
      }) : name,
      _thStyle = hIndex === 0 ? {
        ...thMoreStyle,
        ...style
      } : style;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
      style: {
        ..._Style.S_TH,
        ..._thStyle
      },
      rowSpan: "1",
      colSpan: "1",
      tabIndex: "0",
      "arial-controls": gridId,
      "aria-label": ariaLabel,
      "aria-sort": ariaSort,
      onClick: () => onSort(pn),
      onKeyDown: event => _hThKeyDown(event, pn),
      children: _nameOrEl
    }, h.name);
  }).filter(Boolean);
};
const TableHead = props => {
  const _hThKeyEnter = (evt, pn) => {
    if ((0, _isKeyEnter.default)(evt)) {
      props?.onSort(pn);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
    className: _Style.CL_BLACK,
    style: _Style.S_THEAD,
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
var _default = exports.default = TableHead;
//# sourceMappingURL=TableHead.js.map