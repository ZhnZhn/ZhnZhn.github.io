"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ModalMenu = _interopRequireDefault(require("./ModalMenu"));

var _TableHead = _interopRequireDefault(require("./TableHead"));

var _TableBody = _interopRequireDefault(require("./TableBody"));

var _compFactory = _interopRequireDefault(require("./compFactory"));

var _Style = _interopRequireDefault(require("./Style"));

//import PropTypes from "prop-types";
var C = {
  UP: 'UP',
  DOWN: 'DOWN',
  ASC: 'ascending',
  DESC: 'descending'
};

var Table = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Table, _Component);

  /*
  static propTypes = {
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
  function Table(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hToggleMenuMore = function (evt) {
      evt.stopPropagation();

      _this.setState(function (prevState) {
        return {
          isMenuMore: !prevState.isMenuMore
        };
      });
    };

    _this._hToogleGridLine = function () {
      _this.setState(function (prevState) {
        return {
          isGridLine: !prevState.isGridLine
        };
      });
    };

    _this._hToggleColumn = function (index) {
      _this.setState(function (_ref) {
        var headers = _ref.headers;

        var _index = index + 1;

        headers[_index].isHide = !headers[_index].isHide;
        return {
          headers: [].concat(headers)
        };
      });
    };

    _this._hSort = function (pn) {
      _this.setState(function (prevState) {
        var rows = prevState.rows,
            sortBy = prevState.sortBy,
            sortTo = prevState.sortTo,
            _compBy = _compFactory["default"].compBy(_Style["default"].TOKEN_NAN, pn);

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

    _this.state = {
      isGridLine: true,
      isMenuMore: false,
      headers: props.headers,
      rows: props.rows,
      sortBy: void 0,
      sortTo: void 0
    };
    return _this;
  }

  var _proto = Table.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        gridId = _this$props.gridId,
        thMoreStyle = _this$props.thMoreStyle,
        className = _this$props.className,
        tableFn = _this$props.tableFn,
        _this$state = this.state,
        isGridLine = _this$state.isGridLine,
        isMenuMore = _this$state.isMenuMore,
        sortBy = _this$state.sortBy,
        sortTo = _this$state.sortTo,
        headers = _this$state.headers,
        rows = _this$state.rows,
        _className = isGridLine ? _Style["default"].CL_GRID : '';

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: _Style["default"].WRAPPER_DIV
    }, /*#__PURE__*/_react["default"].createElement(_ModalMenu["default"], {
      isShow: isMenuMore,
      style: _Style["default"].STYLE_MORE,
      onClose: this._hToggleMenuMore,
      isGridLine: isGridLine,
      onToggleGrid: this._hToogleGridLine,
      headers: headers,
      onToggle: this._hToggleColumn
    }), /*#__PURE__*/_react["default"].createElement("table", {
      className: _className + " " + className,
      id: gridId,
      style: _Style["default"].TABLE,
      role: "grid"
    }, /*#__PURE__*/_react["default"].createElement(_TableHead["default"], {
      gridId: gridId,
      thMoreStyle: thMoreStyle,
      headers: headers,
      sortBy: sortBy,
      sortTo: sortTo,
      onSort: this._hSort,
      onMenuMore: this._hToggleMenuMore
    }), /*#__PURE__*/_react["default"].createElement(_TableBody["default"], {
      headers: headers,
      rows: rows,
      tableFn: tableFn
    })));
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