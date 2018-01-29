'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var CL_LINK = "native-link";

var C = {
  UP: 'UP',
  DOWN: 'DOWN',

  ASC: 'ascending',
  DESC: 'descending'
};

var S = {
  ROOT: {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  THEAD: {
    lineHeight: 1.8
  },
  TH: {
    cursor: 'pointer',
    pointerEvents: 'auto',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent'
  },
  TH_UP: {
    borderTop: '3px solid yellow'
  },
  TH_DOWN: {
    borderBottom: '3px solid yellow'
  },
  TD: {
    padding: '6px',
    verticalAlign: 'middle',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    borderTop: 0
  },
  UP: {
    color: '#4caf50',
    fontWeight: 'bold'
  },
  DOWN: {
    color: '#f44336',
    fontWeight: 'bold'
  }
};

var _crTdStyle = function _crTdStyle(v, isR) {
  var style = void 0;
  if (isR) {
    style = v > 0 ? S.UP : S.DOWN;
  }
  return style;
};

var _fCompBy = function _fCompBy(pn) {
  return function (a, b) {
    if (a[pn] < b[pn]) return 1;
    if (a[pn] > b[pn]) return -1;
    return 0;
  };
};

var _toFormatValue = function _toFormatValue(h, v, fn) {
  if (h.isF && typeof fn === 'function') {
    return fn(v);
  }
  return v;
};

var _crLinkEl = function _crLinkEl(id, title, fn) {
  var _href = typeof fn === 'function' ? fn(id) : undefined;
  return _react2.default.createElement(
    'a',
    {
      className: CL_LINK,
      href: _href
    },
    title
  );
};

var _crThAriaLabel = function _crThAriaLabel(name, order) {
  return name + ': activate to sort column ' + order;
};

var _crAppearance = function _crAppearance(_ref) {
  var pn = _ref.pn,
      name = _ref.name,
      sortBy = _ref.sortBy,
      sortTo = _ref.sortTo;

  var style = void 0,
      ariaSort = void 0,
      ariaLabel = void 0;
  if (pn === sortBy) {
    if (sortTo === C.UP) {
      style = S.TH_UP;
      ariaSort = C.DESC;
      ariaLabel = _crThAriaLabel(name, C.ASC);
    } else {
      style = S.TH_DOWN;
      ariaSort = C.ASC;
      ariaLabel = _crThAriaLabel(name, C.DESC);
    }
  } else {
    ariaLabel = _crThAriaLabel(name, C.ASC);
  }
  return { style: style, ariaSort: ariaSort, ariaLabel: ariaLabel };
};

var Table = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Table, _Component);

  function Table(props) {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this));

    _this._hSort = function (pn) {
      _this.setState(function (prevState) {
        var rows = prevState.rows,
            sortBy = prevState.sortBy,
            sortTo = prevState.sortTo,
            _rows = pn === sortBy ? rows.reverse() : rows.sort(_fCompBy(pn)),
            _sortTo = pn === sortBy ? sortTo === C.DOWN ? C.UP : C.DOWN : C.UP;

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

    _this._renderHeader = function () {
      var _this$props = _this.props,
          gridId = _this$props.gridId,
          headers = _this$props.headers,
          _this$state = _this.state,
          sortBy = _this$state.sortBy,
          sortTo = _this$state.sortTo;

      return headers.map(function (h) {
        var name = h.name,
            pn = h.pn,
            _crAppearance2 = _crAppearance({
          pn: pn, name: name, sortBy: sortBy, sortTo: sortTo
        }),
            style = _crAppearance2.style,
            ariaSort = _crAppearance2.ariaSort,
            ariaLabel = _crAppearance2.ariaLabel;

        return _react2.default.createElement(
          'th',
          {
            style: (0, _extends3.default)({}, S.TH, style),
            rowSpan: '1',
            colSpan: '1',
            tabIndex: '0',
            'arial-controls': gridId,
            'aria-label': ariaLabel,
            'aria-sort': ariaSort,
            onClick: _this._hSort.bind(null, pn),
            onKeyPress: _this._hThKeyPressed.bind(null, pn)
          },
          name
        );
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
        var _elTd = headers.map(function (h) {
          var pn = h.pn,
              style = h.style,
              isR = h.isR,
              isHref = h.isHref,
              v = r[pn],
              _v = _toFormatValue(h, v, numberFormat),
              _tdStyle = _crTdStyle(v, isR),
              _elValueOrTitle = isHref ? _crLinkEl(r.id, _v, valueToHref) : _v;

          return _react2.default.createElement(
            'td',
            {
              key: rIndex,
              style: (0, _extends3.default)({}, S.TD, style, _tdStyle)
            },
            _elValueOrTitle
          );
        });
        return _react2.default.createElement(
          'tr',
          { role: 'row' },
          _elTd
        );
      });
    };

    _this.state = {
      rows: props.rows,
      sortBy: undefined,
      sortTo: undefined
    };
    return _this;
  }
  /*
  static propTypes = {
    gridId: PropTypes.string,
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

  (0, _createClass3.default)(Table, [{
    key: 'render',
    value: function render() {
      var gridId = this.props.gridId;

      return _react2.default.createElement(
        'table',
        {
          id: gridId,
          style: S.ROOT,
          role: 'grid'
        },
        _react2.default.createElement(
          'thead',
          { style: S.THEAD },
          _react2.default.createElement(
            'tr',
            null,
            this._renderHeader()
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          this._renderRows()
        )
      );
    }
  }]);
  return Table;
}(_react.Component), _class.defaultProps = {
  rows: [],
  headers: [],
  tableFn: {}
}, _temp);
exports.default = Table;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-table\Table.js.map