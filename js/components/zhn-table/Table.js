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
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgMore = require('../zhn/SvgMore');

var _SvgMore2 = _interopRequireDefault(_SvgMore);

var _StylePopup = require('./StylePopup');

var _StylePopup2 = _interopRequireDefault(_StylePopup);

var _compFactory = require('./compFactory');

var _compFactory2 = _interopRequireDefault(_compFactory);

var _tableFn = require('./tableFn');

var _tableFn2 = _interopRequireDefault(_tableFn);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _react2.default.createElement(
    'a',
    {
      className: CL_LINK,
      href: _href
    },
    title
  );
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
            _compBy = _compFactory2.default.compBy(TOKEN_NAN, pn);

        var _rows = void 0,
            _sortTo = void 0;
        if (pn === sortBy && sortTo === C.UP) {
          _rows = rows.sort(_compFactory2.default.opCompBy(pn, _compBy));
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
      _this.setState({ isGridLine: true });
    };

    _this._hUnCheckGridLine = function () {
      _this.setState({ isGridLine: false });
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
            _FN$crAppearance = _tableFn2.default.crAppearance({
          S: _Style2.default, C: C, pn: pn, name: name, sortBy: sortBy, sortTo: sortTo
        }),
            style = _FN$crAppearance.style,
            ariaSort = _FN$crAppearance.ariaSort,
            ariaLabel = _FN$crAppearance.ariaLabel,
            _elMore1 = hIndex === 0 ? _react2.default.createElement(_SvgMore2.default, { svgStyle: _Style2.default.SVG_MORE, onClick: _this._hToggleMoreStyle }) : null,
            _thStyle = hIndex === 0 ? thMoreStyle : null;

        return _react2.default.createElement(
          'th',
          {
            style: (0, _extends3.default)({}, _Style2.default.TH, _thStyle, style),
            rowSpan: '1',
            colSpan: '1',
            tabIndex: '0',
            'arial-controls': gridId,
            'aria-label': ariaLabel,
            'aria-sort': ariaSort,
            onClick: _this._hSort.bind(null, pn),
            onKeyPress: _this._hThKeyPressed.bind(null, pn)
          },
          _elMore1,
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
              _v = _tableFn2.default.toFormatValue({ TOKEN_NAN: TOKEN_NAN, h: h, v: v, fn: numberFormat }),
              _tdStyle = _tableFn2.default.crTdStyle({ S: _Style2.default, v: v, isR: isR }),
              _elValueOrTitle = isHref ? _crLinkEl(r.id, _v, valueToHref) : _v;

          return _react2.default.createElement(
            'td',
            {
              key: rIndex,
              style: (0, _extends3.default)({}, _Style2.default.TD, style, _tdStyle)
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
      isGridLine: true,
      rows: props.rows,
      sortBy: undefined,
      sortTo: undefined,
      isMoreStyle: false
    };
    return _this;
  }
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

  (0, _createClass3.default)(Table, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          gridId = _props.gridId,
          className = _props.className,
          _state = this.state,
          isGridLine = _state.isGridLine,
          isMoreStyle = _state.isMoreStyle,
          _className = isGridLine ? CL_GRID : '';

      return _react2.default.createElement(
        'table',
        {
          className: _className + ' ' + className,
          id: gridId,
          style: _Style2.default.ROOT,
          role: 'grid'
        },
        _react2.default.createElement(
          'thead',
          { style: _Style2.default.THEAD },
          _react2.default.createElement(
            'tr',
            null,
            this._renderHeader()
          ),
          _react2.default.createElement(_StylePopup2.default, {
            isShow: isMoreStyle,
            style: _Style2.default.STYLE_MORE,
            onClose: this._hToggleMoreStyle,
            isGridLine: isGridLine,
            onCheck: this._hCheckGridLine,
            onUnCheck: this._hUnCheckGridLine
          })
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
  className: '',
  rows: [],
  headers: [],
  tableFn: {}
}, _temp);
exports.default = Table;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-table\Table.js.map