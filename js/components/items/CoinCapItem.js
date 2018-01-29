'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _Table = require('../zhn-table/Table');

var _Table2 = _interopRequireDefault(_Table);

var _ItemHeader = require('./ItemHeader');

var _ItemHeader2 = _interopRequireDefault(_ItemHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    paddingBottom: '8px'
  },
  SHOW_HIDE: {
    paddingTop: '8px',
    paddingBottom: '8px'
  }
};

var CoinCapItem = function (_Component) {
  (0, _inherits3.default)(CoinCapItem, _Component);

  function CoinCapItem() {
    (0, _classCallCheck3.default)(this, CoinCapItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CoinCapItem.__proto__ || Object.getPrototypeOf(CoinCapItem)).call(this));

    _this._hToggle = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    };

    _this.state = {
      isOpen: true
    };
    return _this;
  }

  (0, _createClass3.default)(CoinCapItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          config = _props.config,
          onCloseItem = _props.onCloseItem,
          id = config.id,
          title = config.title,
          headers = config.headers,
          rows = config.rows,
          tableFn = config.tableFn,
          _gridId = 'coins_' + id,
          isOpen = this.state.isOpen;

      return _react2.default.createElement(
        'div',
        { style: S.ROOT },
        _react2.default.createElement(_ItemHeader2.default, {
          isOpen: isOpen,
          caption: title,
          onClick: this._hToggle,
          onClose: onCloseItem
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          {
            isShow: isOpen,
            style: S.SHOW_HIDE
          },
          _react2.default.createElement(_Table2.default, {
            gridId: _gridId,
            headers: headers,
            rows: rows,
            tableFn: tableFn
          })
        )
      );
    }
  }]);
  return CoinCapItem;
}(_react.Component);

exports.default = CoinCapItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\CoinCapItem.js.map