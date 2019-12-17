"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));

var _TwitterLink = _interopRequireDefault(require("../about/TwitterLink"));

var _CrcLink = _interopRequireDefault(require("../native-links/CrcLink"));

var CL_TOPIC = 'ci-topic';
var S = {
  ROOT: {
    marginBottom: 8
  },
  SHOW_HIDE: {
    paddingTop: 8
  },
  TOPIC: {
    paddingLeft: 24,
    paddingRight: 24,
    lineHeight: 1.6,
    fontWeight: 600
  },
  FIELD: {
    display: 'inline-block',
    paddingLeft: 24,
    fontWeight: 600
  },
  TITLE: {
    color: '#1b75bb'
  },
  TWITTER: {
    top: 0,
    marginLeft: 24
  },
  N_LINK: {
    marginLeft: 16
  }
};

var Field = function Field(_ref) {
  var title = _ref.title,
      text = _ref.text;

  var _text = text == null ? '' : text;

  if (!_text) {
    return null;
  }

  return _react["default"].createElement("div", {
    style: S.FIELD
  }, _react["default"].createElement("span", {
    style: S.TITLE
  }, title, ":\xA0"), _react["default"].createElement("span", null, _text));
};

var RowField = function RowField(_ref2) {
  var items = _ref2.items,
      children = _ref2.children;

  var _elFields = items.map(function (item) {
    return _react["default"].createElement(Field, {
      key: item.t,
      title: item.t,
      text: item.v
    });
  }).filter(function (item) {
    return item !== null;
  });

  if (_elFields.length === 0) {
    return null;
  }

  return _react["default"].createElement("div", null, _elFields, children);
};

var Topic = function Topic(_ref3) {
  var className = _ref3.className,
      title = _ref3.title,
      str = _ref3.str;

  var __html = _dompurify["default"].sanitize(str);

  if (!__html) {
    return null;
  }

  return _react["default"].createElement(_OpenClose["default"], {
    caption: title,
    isClose: true
  }, _react["default"].createElement("div", {
    className: className,
    style: S.TOPIC,
    dangerouslySetInnerHTML: {
      __html: __html
    }
  }));
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && !Number.isNaN(n);
};

var _crUpdateTS = function _crUpdateTS(n) {
  return _isNumber(n) ? new Date(n * 1000).toISOString().split('T')[0] : '';
};

var CoinInfoItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(CoinInfoItem, _Component);

  function CoinInfoItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      isOpen: true
    };

    _this._hToggle = function () {
      _this.setState(function (prevState) {
        return {
          isOpen: !prevState.isOpen
        };
      });
    };

    return _this;
  }

  var _proto = CoinInfoItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        config = _this$props.config,
        onCloseItem = _this$props.onCloseItem;

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
        items1 = [{
      t: "Alg.",
      v: Algorithm
    }, {
      t: "Proof",
      v: ProofType
    }, {
      t: "StartDate",
      v: StartDate
    }],
        items2 = [{
      t: "TotalC",
      v: TotalCoinSupply
    }, {
      t: "MinedC",
      v: TotalCoinsMined
    }, {
      t: "PrevMined",
      v: PreviousTotalCoinsMined
    }],
        items3 = [{
      t: "Reward",
      v: BlockReward
    }, {
      t: "Reduct.",
      v: BlockRewardReduction
    }, {
      t: "BlNumber",
      v: BlockNumber
    }],
        items4 = [{
      t: "BlTime",
      v: BlockTime
    }, {
      t: "UpdateTS",
      v: _updateTS
    }],
        isOpen = this.state.isOpen;

    return _react["default"].createElement("div", {
      style: S.ROOT
    }, _react["default"].createElement(_ItemHeader["default"], {
      isOpen: isOpen,
      caption: Id,
      onClick: this._hToggle,
      onClose: onCloseItem
    }), _react["default"].createElement(_ShowHide["default"], {
      isShow: isOpen,
      style: S.SHOW_HIDE
    }, _react["default"].createElement(_OpenClose["default"], {
      caption: "Coin Params (" + Id + ")"
    }, _react["default"].createElement(RowField, {
      items: items1
    }), _react["default"].createElement(RowField, {
      items: items2
    }), _react["default"].createElement(RowField, {
      items: items3
    }), _react["default"].createElement(RowField, {
      items: items4
    }, _react["default"].createElement(_TwitterLink["default"], {
      rootStyle: S.TWITTER,
      account: _twitter
    }))), _react["default"].createElement(Topic, {
      className: CL_TOPIC,
      title: "Description",
      str: Description
    }), _react["default"].createElement(Topic, {
      className: CL_TOPIC,
      title: "Features",
      str: Features
    }), _react["default"].createElement(Topic, {
      title: "Technology",
      str: Technology
    }), _react["default"].createElement(_CrcLink["default"], {
      style: S.N_LINK,
      item: Id
    })));
  };

  return CoinInfoItem;
}(_react.Component);

var _default = CoinInfoItem;
exports["default"] = _default;
//# sourceMappingURL=CoinInfoItem.js.map