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

var _dompurify = require('dompurify');

var _dompurify2 = _interopRequireDefault(_dompurify);

var _ItemHeader = require('./ItemHeader');

var _ItemHeader2 = _interopRequireDefault(_ItemHeader);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _OpenClose = require('../zhn/OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _TwitterLink = require('../about/TwitterLink');

var _TwitterLink2 = _interopRequireDefault(_TwitterLink);

var _CrcLink = require('../native-links/CrcLink');

var _CrcLink2 = _interopRequireDefault(_CrcLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    marginBottom: '8px'
  },
  SHOW_HIDE: {
    paddingTop: '8px'
  },
  DIV: {
    paddingLeft: '24px',
    paddingRight: '24px',
    lineHeight: 1.6
  },
  FIELD: {
    display: 'inline-block',
    paddingLeft: '24px',
    fontWeight: 'bold'
  },
  TITLE: {
    color: '#1b75bb'
  },
  TWITTER: {
    top: 0,
    marginLeft: '24px'
  },
  N_LINK: {
    marginLeft: '16px'
  }
};

var Field = function Field(_ref) {
  var title = _ref.title,
      text = _ref.text;

  var _text = text == null ? '' : text;
  if (!_text) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { style: S.FIELD },
    _react2.default.createElement(
      'span',
      { style: S.TITLE },
      title,
      ':\xA0'
    ),
    _react2.default.createElement(
      'span',
      null,
      _text
    )
  );
};

var RowField = function RowField(_ref2) {
  var items = _ref2.items,
      children = _ref2.children;

  var _elFields = items.map(function (item) {
    return _react2.default.createElement(Field, { key: item.t, title: item.t, text: item.v });
  }).filter(function (item) {
    return item !== null;
  });
  if (_elFields.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    null,
    _elFields,
    children
  );
};

var Topic = function Topic(_ref3) {
  var title = _ref3.title,
      str = _ref3.str;

  var __html = _dompurify2.default.sanitize(str);
  if (!__html) {
    return null;
  }
  return _react2.default.createElement(
    _OpenClose2.default,
    {
      caption: title,
      isClose: true
    },
    _react2.default.createElement('div', {
      style: S.DIV,
      dangerouslySetInnerHTML: { __html: __html }
    })
  );
};

var _crUpdateTS = function _crUpdateTS(n) {
  if (typeof n === 'number' && !Number.isNaN(n)) {
    return new Date(n * 1000).toISOString().split('T')[0];
  }
  return '';
};

var CoinInfoItem = function (_Component) {
  (0, _inherits3.default)(CoinInfoItem, _Component);

  function CoinInfoItem(props) {
    (0, _classCallCheck3.default)(this, CoinInfoItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CoinInfoItem.__proto__ || Object.getPrototypeOf(CoinInfoItem)).call(this));

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

  (0, _createClass3.default)(CoinInfoItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          config = _props.config,
          onCloseItem = _props.onCloseItem;

      var _config$General = config.General,
          Id = _config$General.Symbol,
          Description = _config$General.Description,
          Features = _config$General.Features,
          Technology = _config$General.Technology,
          Algorithm = _config$General.Algorithm,
          ProofType = _config$General.ProofType,
          StartDate = _config$General.StartDate,
          TotalCoinSupply = _config$General.TotalCoinSupply,
          TotalCoinsMined = _config$General.TotalCoinsMined,
          PreviousTotalCoinsMined = _config$General.PreviousTotalCoinsMined,
          BlockReward = _config$General.BlockReward,
          BlockRewardReduction = _config$General.BlockRewardReduction,
          BlockNumber = _config$General.BlockNumber,
          BlockTime = _config$General.BlockTime,
          UpdateTS = _config$General.LastBlockExplorerUpdateTS,
          Twitter = _config$General.Twitter,
          _updateTS = _crUpdateTS(UpdateTS),
          _twitter = Twitter.replace(/@/g, '').trim(),
          items1 = [{ t: "Alg.", v: Algorithm }, { t: "Proof", v: ProofType }, { t: "StartDate", v: StartDate }],
          items2 = [{ t: "TotalC", v: TotalCoinSupply }, { t: "MinedC", v: TotalCoinsMined }, { t: "PrevMined", v: PreviousTotalCoinsMined }],
          items3 = [{ t: "Reward", v: BlockReward }, { t: "Reduct.", v: BlockRewardReduction }, { t: "BlNumber", v: BlockNumber }],
          items4 = [{ t: "BlTime", v: BlockTime }, { t: "UpdateTS", v: _updateTS }],
          isOpen = this.state.isOpen;

      return _react2.default.createElement(
        'div',
        { style: S.ROOT },
        _react2.default.createElement(_ItemHeader2.default, {
          isOpen: isOpen,
          caption: Id,
          onClick: this._hToggle,
          onClose: onCloseItem
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          {
            isShow: isOpen,
            style: S.SHOW_HIDE
          },
          _react2.default.createElement(
            _OpenClose2.default,
            { caption: 'Coin Params (' + Id + ')' },
            _react2.default.createElement(RowField, { items: items1 }),
            _react2.default.createElement(RowField, { items: items2 }),
            _react2.default.createElement(RowField, { items: items3 }),
            _react2.default.createElement(
              RowField,
              { items: items4 },
              _react2.default.createElement(_TwitterLink2.default, {
                rootStyle: S.TWITTER,
                account: _twitter
              })
            )
          ),
          _react2.default.createElement(Topic, {
            title: 'Description',
            str: Description
          }),
          _react2.default.createElement(Topic, {
            title: 'Features',
            str: Features
          }),
          _react2.default.createElement(Topic, {
            title: 'Technology',
            str: Technology
          }),
          _react2.default.createElement(_CrcLink2.default, {
            style: S.N_LINK,
            item: Id
          })
        )
      );
    }
  }]);
  return CoinInfoItem;
}(_react.Component);

exports.default = CoinInfoItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\CoinInfoItem.js.map