"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _RouterNativeLink = _interopRequireDefault(require("../native-links/RouterNativeLink"));

var _ButtonTab = _interopRequireDefault(require("../zhn/ButtonTab"));

var _InfoPart = _interopRequireDefault(require("../zhn/InfoPart"));

var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose2"));

var CL_DESCR = 'info__descr';
var S = {
  ROOT_SHOW: {
    position: 'relative',
    display: 'block',
    paddingTop: 34,
    paddingRight: 20,
    paddingLeft: 8
  },
  ROOT_HIDE: {
    position: 'relative',
    display: 'none'
  },
  INFO_ROOT: {
    marginTop: 4
  },
  INFO_CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    width: 90,
    paddingRight: 5,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  INFO_TEXT: {
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize'
  },
  DESCR_OC: {
    paddingTop: 12
  },
  DESCR_ROOT: {
    marginTop: 10
  },
  DESCR_TEXT: {
    color: 'gray',
    fontWeight: 'bold'
  }
};

var _isWithoutLink = function _isWithoutLink(item) {
  if (item === void 0) {
    item = {};
  }

  var _item = item,
      _item$id = _item.id,
      id = _item$id === void 0 ? '' : _item$id;
  return id.split('/')[0] === 'LSE' ? true : false;
};

var PanelDataInfo =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(PanelDataInfo, _Component);

  function PanelDataInfo() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._renderQuandlLink = function (dbCode, dsCode) {
      if (!dbCode || !dsCode) {
        return null;
      } else {
        var Comp = _RouterNativeLink["default"]['QUANDL'];
        return _react["default"].createElement(Comp, {
          dbCode: dbCode,
          dsCode: dsCode
        });
      }
    };

    _this._renderNativeLink = function (linkFn, item) {
      if (_isWithoutLink(item)) {
        return null;
      }

      var Comp = _RouterNativeLink["default"][linkFn];
      return typeof Comp !== 'undefined' ? _react["default"].createElement(Comp, {
        item: item
      }) : null;
    };

    return _this;
  }

  var _proto = PanelDataInfo.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        _this$props$info = _this$props.info,
        info = _this$props$info === void 0 ? {} : _this$props$info,
        _this$props$zhInfo = _this$props.zhInfo,
        zhInfo = _this$props$zhInfo === void 0 ? {} : _this$props$zhInfo,
        onClickChart = _this$props.onClickChart,
        name = info.name,
        toDate = info.toDate,
        fromDate = info.fromDate,
        frequency = info.frequency,
        database_code = info.database_code,
        dataset_code = info.dataset_code,
        description = info.description,
        item = zhInfo.item,
        linkFn = zhInfo.linkFn,
        _rootStyle = isShow ? S.ROOT_SHOW : S.ROOT_HIDE,
        _isDescr = description ? true : false,
        _isDescrClose = _isDescr && description.length > 200 ? true : false;

    return _react["default"].createElement("div", {
      style: _rootStyle
    }, _react["default"].createElement(_ButtonTab["default"], {
      caption: "Chart",
      onClick: onClickChart
    }), _react["default"].createElement(_InfoPart["default"], {
      text: name,
      styleText: S.INFO_TEXT
    }), _react["default"].createElement(_InfoPart["default"], {
      caption: "From Date:",
      text: fromDate,
      styleCaption: S.INFO_CAPTION,
      styleText: S.INFO_TEXT
    }), _react["default"].createElement(_InfoPart["default"], {
      caption: "To Date:",
      text: toDate,
      rootStyle: S.INFO_ROOT,
      styleCaption: S.INFO_CAPTION,
      styleText: S.INFO_TEXT
    }), _react["default"].createElement(_InfoPart["default"], {
      caption: "Frequency:",
      text: frequency,
      styleCaption: S.INFO_CAPTION,
      styleText: S.INFO_TEXT
    }), this._renderQuandlLink(database_code, dataset_code), _isDescr && _react["default"].createElement(_OpenClose["default"], {
      caption: "Description",
      isClose: _isDescrClose,
      style: S.DESCR_OC
    }, _react["default"].createElement(_InfoPart["default"], {
      text: description,
      isHtml: true,
      classText: CL_DESCR,
      rootStyle: S.DESCR_ROOT,
      styleText: S.DESCR_TEXT
    })), this._renderNativeLink(linkFn, item));
  };

  return PanelDataInfo;
}(_react.Component);

var _default = PanelDataInfo;
exports["default"] = _default;
//# sourceMappingURL=PanelDataInfo.js.map