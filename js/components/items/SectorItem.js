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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  RANK: {
    marginBottom: '4px'
  },
  RANK_HEADER: {
    color: 'rgb(164, 135, 212)',

    backgroundColor: 'rgb(35, 47, 59)',
    paddingTop: '4px',
    lineHeight: '1.8',
    height: '32px',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',

    paddingLeft: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  RANK_CAPTION: {
    display: 'inline-block',
    width: '230px'
  },
  RANK_VALUE_UP: {
    color: 'rgb(76, 175, 80)'
  },
  RANK_VALUE_DOWN: {
    color: 'rgb(244, 67, 54)'
  }
};

var RankValue = function RankValue(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === undefined ? '' : _ref$value;

  var _style = value[0] === '-' ? S.RANK_VALUE_DOWN : S.RANK_VALUE_UP;
  return _react2.default.createElement(
    'span',
    { style: _style },
    value
  );
};

var RankItem = function (_Component) {
  (0, _inherits3.default)(RankItem, _Component);

  function RankItem(props) {
    (0, _classCallCheck3.default)(this, RankItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RankItem.__proto__ || Object.getPrototypeOf(RankItem)).call(this));

    _this._handleClickCaption = function () {
      _this.setState({ isShowItems: !_this.state.isShowItems });
    };

    _this._renderItems = function (items) {
      return items.map(function (item) {
        var caption = item.caption,
            value = item.value;

        return _react2.default.createElement(
          'div',
          {
            className: 'row__topic',
            key: caption
          },
          _react2.default.createElement(
            'span',
            { style: S.RANK_CAPTION },
            caption
          ),
          _react2.default.createElement(RankValue, { value: value })
        );
      });
    };

    _this.state = {
      isShowItems: false
    };
    return _this;
  }

  (0, _createClass3.default)(RankItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          _props$items = _props.items,
          items = _props$items === undefined ? [] : _props$items,
          isShowItems = this.state.isShowItems;

      return _react2.default.createElement(
        'div',
        { style: S.RANK },
        _react2.default.createElement(
          'div',
          {
            style: S.RANK_HEADER,
            onClick: this._handleClickCaption
          },
          caption
        ),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowItems },
          this._renderItems(items)
        )
      );
    }
  }]);
  return RankItem;
}(_react.Component);

var SectorItem = function (_Component2) {
  (0, _inherits3.default)(SectorItem, _Component2);

  function SectorItem() {
    var _ref2;

    var _temp, _this2, _ret;

    (0, _classCallCheck3.default)(this, SectorItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref2 = SectorItem.__proto__ || Object.getPrototypeOf(SectorItem)).call.apply(_ref2, [this].concat(args))), _this2), _this2._renderRanks = function (ranks) {
      return ranks.map(function (rank, index) {
        var caption = rank.caption,
            items = rank.items;

        return _react2.default.createElement(RankItem, {
          key: index,
          caption: caption,
          items: items
        });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
  }

  (0, _createClass3.default)(SectorItem, [{
    key: 'render',
    value: function render() {
      var _props$config = this.props.config,
          config = _props$config === undefined ? {} : _props$config,
          _config$ranks = config.ranks,
          ranks = _config$ranks === undefined ? [] : _config$ranks;

      return _react2.default.createElement(
        'div',
        null,
        this._renderRanks(ranks)
      );
    }
  }]);
  return SectorItem;
}(_react.Component);

exports.default = SectorItem;
//# sourceMappingURL=SectorItem.js.map