"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _SvgMore = _interopRequireDefault(require("../zhn/SvgMore"));

var _StylePopup = _interopRequireDefault(require("./StylePopup"));

var _compFactory = _interopRequireDefault(require("./compFactory"));

var _tableFn = _interopRequireDefault(require("./tableFn"));

var _Style = _interopRequireDefault(require("./Style"));

var CL_LINK = "native-link";
var CL_GRID = "grid";
var TOKEN_NAN = '―';
var C = {
  UP: 'UP',
  DOWN: 'DOWN',
  ASC: 'ascending',
  DESC: 'descending'
};

var _crLinkEl = function _crLinkEl(id, title, fn) {
  var _href = typeof fn === 'function' ? fn(id) : undefined;

  return _react["default"].createElement("a", {
    className: CL_LINK,
    href: _href
  }, title);
};

var Table =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Table, _Component);

  /*
  static propTypes = {
    gridId: PropTypes.string,
    thMoreStyle: PropTypes.object,
    rows: PropTypes.array,
    headers: PropTypes.arrayOf(
       PropTypes.shape({
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
  function Table(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hSort = function (pn) {
      _this.setState(function (prevState) {
        var rows = prevState.rows,
            sortBy = prevState.sortBy,
            sortTo = prevState.sortTo,
            _compBy = _compFactory["default"].compBy(TOKEN_NAN, pn);

        var _rows, _sortTo;

        if (pn === sortBy && sortTo === C.UP) {
          _rows = rows.sort(_compFactory["default"].opCompBy(pn, _compBy));
          _sortTo = C.DOWN;
        } else {
          _rows = rows.sort(_compBy);
          _sortTo = C.UP;
        }

        return {
          rows: _rows,
          sortBy: pn,
          sortTo: _sortTo
        };
      });
    };

    _this._hThKeyPressed = function (pn, evt) {
      evt.preventDefault();
      var which = evt.which;

      if (which === 13 || which === 32) {
        _this._hSort(pn);
      }
    };

    _this._hToggleMoreStyle = function (evt) {
      evt.stopPropagation();

      _this.setState(function (prevState) {
        return {
          isMoreStyle: !prevState.isMoreStyle
        };
      });
    };

    _this._hCheckGridLine = function () {
      _this.setState({
        isGridLine: true
      });
    };

    _this._hUnCheckGridLine = function () {
      _this.setState({
        isGridLine: false
      });
    };

    _this._renderHeader = function () {
      var _this$props = _this.props,
          gridId = _this$props.gridId,
          thMoreStyle = _this$props.thMoreStyle,
          headers = _this$props.headers,
          _this$state = _this.state,
          sortBy = _this$state.sortBy,
          sortTo = _this$state.sortTo;
      return headers.map(function (h, hIndex) {
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
            _elMore1 = hIndex === 0 ? _react["default"].createElement(_SvgMore["default"], {
          svgStyle: _Style["default"].SVG_MORE,
          onClick: _this._hToggleMoreStyle
        }) : null,
            _thStyle = hIndex === 0 ? thMoreStyle : null;

        return _react["default"].createElement("th", {
          key: h.name,
          style: (0, _extends2["default"])({}, _Style["default"].TH, {}, _thStyle, {}, style),
          rowSpan: "1",
          colSpan: "1",
          tabIndex: "0",
          "arial-controls": gridId,
          "aria-label": ariaLabel,
          "aria-sort": ariaSort,
          onClick: _this._hSort.bind(null, pn),
          onKeyPress: _this._hThKeyPressed.bind(null, pn)
        }, _elMore1, name);
      });
    };

    _this._renderRows = function () {
      var _this$props2 = _this.props,
          headers = _this$props2.headers,
          tableFn = _this$props2.tableFn,
          numberFormat = tableFn.numberFormat,
          valueToHref = tableFn.valueToHref,
          rows = _this.state.rows;
      return rows.map(function (r, rIndex) {
        var _elTd = headers.map(function (h, hIndex) {
          var pn = h.pn,
              style = h.style,
              isR = h.isR,
              isHref = h.isHref,
              _key = r.id + hIndex,
              v = r[pn],
              _v = _tableFn["default"].toFormatValue({
            TOKEN_NAN: TOKEN_NAN,
            h: h,
            v: v,
            fn: numberFormat
          }),
              _tdStyle = _tableFn["default"].crTdStyle({
            S: _Style["default"],
            v: v,
            isR: isR
          }),
              _elValueOrTitle = isHref ? _crLinkEl(r.id, _v, valueToHref) : _v;

          return _react["default"].createElement("td", {
            key: _key,
            style: (0, _extends2["default"])({}, _Style["default"].TD, {}, style, {}, _tdStyle)
          }, _elValueOrTitle);
        });

        return _react["default"].createElement("tr", {
          key: r.id,
          role: "row"
        }, _elTd);
      });
    };

    _this.state = {
      isGridLine: true,
      rows: props.rows,
      sortBy: void 0,
      sortTo: void 0,
      isMoreStyle: false
    };
    return _this;
  }

  var _proto = Table.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        gridId = _this$props3.gridId,
        className = _this$props3.className,
        _this$state2 = this.state,
        isGridLine = _this$state2.isGridLine,
        isMoreStyle = _this$state2.isMoreStyle,
        _className = isGridLine ? CL_GRID : '';

    return _react["default"].createElement("table", {
      className: _className + " " + className,
      id: gridId,
      style: _Style["default"].ROOT,
      role: "grid"
    }, _react["default"].createElement("thead", {
      style: _Style["default"].THEAD
    }, _react["default"].createElement("tr", null, this._renderHeader()), _react["default"].createElement(_StylePopup["default"], {
      isShow: isMoreStyle,
      style: _Style["default"].STYLE_MORE,
      onClose: this._hToggleMoreStyle,
      isGridLine: isGridLine,
      onCheck: this._hCheckGridLine,
      onUnCheck: this._hUnCheckGridLine
    })), _react["default"].createElement("tbody", null, this._renderRows()));
  };

  return Table;
}(_react.Component);

Table.defaultProps = {
  className: '',
  rows: [],
  headers: [],
  tableFn: {}
};
var _default = Table;
exports["default"] = _default;
//# sourceMappingURL=Table.js.map