"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _TableHead = _interopRequireDefault(require("./TableHead"));

var _compFactory = _interopRequireDefault(require("./compFactory"));

var _tableFn = _interopRequireDefault(require("./tableFn"));

var _Style = _interopRequireDefault(require("./Style"));

//import PropTypes from "prop-types";
var TOKEN_NAN = '―';
var C = {
  UP: 'UP',
  DOWN: 'DOWN',
  ASC: 'ascending',
  DESC: 'descending'
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crLinkEl = function _crLinkEl(id, title, fn) {
  var _href = _isFn(fn) ? fn(id) : undefined;

  return _react["default"].createElement("a", {
    className: _Style["default"].CL_LINK,
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

    _this._renderRows = function () {
      var _this$props = _this.props,
          headers = _this$props.headers,
          tableFn = _this$props.tableFn,
          numberFormat = tableFn.numberFormat,
          valueToHref = tableFn.valueToHref,
          rows = _this.state.rows;
      return rows.map(function (r, rIndex) {
        var _elTds = headers.map(function (h, hIndex) {
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
        }, _elTds);
      });
    };

    _this.state = {
      isGridLine: true,
      rows: props.rows,
      sortBy: void 0,
      sortTo: void 0
    };
    return _this;
  }

  var _proto = Table.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        gridId = _this$props2.gridId,
        thMoreStyle = _this$props2.thMoreStyle,
        headers = _this$props2.headers,
        className = _this$props2.className,
        _this$state = this.state,
        isGridLine = _this$state.isGridLine,
        sortBy = _this$state.sortBy,
        sortTo = _this$state.sortTo,
        _className = isGridLine ? _Style["default"].CL_GRID : '';

    return _react["default"].createElement("table", {
      className: _className + " " + className,
      id: gridId,
      style: _Style["default"].ROOT,
      role: "grid"
    }, _react["default"].createElement(_TableHead["default"], {
      gridId: gridId,
      thMoreStyle: thMoreStyle,
      headers: headers,
      isGridLine: isGridLine,
      onCheckGridLine: this._hCheckGridLine,
      onUnCheckGridLine: this._hUnCheckGridLine,
      sortBy: sortBy,
      sortTo: sortTo,
      onSort: this._hSort
    }), _react["default"].createElement("tbody", null, this._renderRows()));
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