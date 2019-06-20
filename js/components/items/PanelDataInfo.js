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

var _RouterNativeLink = require('../native-links/RouterNativeLink');

var _RouterNativeLink2 = _interopRequireDefault(_RouterNativeLink);

var _ButtonTab = require('../zhn/ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

var _InfoPart = require('../zhn/InfoPart');

var _InfoPart2 = _interopRequireDefault(_InfoPart);

var _OpenClose = require('../zhn/OpenClose2');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    width: 110,
    textAlign: 'right',
    paddingRight: 5,
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

var _isWithoutLink = function _isWithoutLink() {
  var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _item$id = item.id,
      id = _item$id === undefined ? '' : _item$id;

  return id.split('/')[0] === 'LSE' ? true : false;
};

var PanelDataInfo = function (_Component) {
  (0, _inherits3.default)(PanelDataInfo, _Component);

  function PanelDataInfo() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PanelDataInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PanelDataInfo.__proto__ || Object.getPrototypeOf(PanelDataInfo)).call.apply(_ref, [this].concat(args))), _this), _this._renderQuandlLink = function (dbCode, dsCode) {
      if (!dbCode || !dsCode) {
        return null;
      } else {
        var Comp = _RouterNativeLink2.default['QUANDL'];
        return _react2.default.createElement(Comp, { dbCode: dbCode, dsCode: dsCode });
      }
    }, _this._renderNativeLink = function (linkFn, item) {
      if (_isWithoutLink(item)) {
        return null;
      }
      var Comp = _RouterNativeLink2.default[linkFn];
      return typeof Comp !== 'undefined' ? _react2.default.createElement(Comp, { item: item }) : null;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PanelDataInfo, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          _props$info = _props.info,
          info = _props$info === undefined ? {} : _props$info,
          _props$zhInfo = _props.zhInfo,
          zhInfo = _props$zhInfo === undefined ? {} : _props$zhInfo,
          onClickChart = _props.onClickChart,
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

      return _react2.default.createElement(
        'div',
        { style: _rootStyle },
        _react2.default.createElement(_ButtonTab2.default, {
          caption: 'Chart',
          isShow: false,
          onClick: onClickChart
        }),
        _react2.default.createElement(_InfoPart2.default, {
          text: name,
          styleText: S.INFO_TEXT
        }),
        _react2.default.createElement(_InfoPart2.default, {
          caption: 'From Date:',
          text: fromDate,
          styleCaption: S.INFO_CAPTION,
          styleText: S.INFO_TEXT
        }),
        _react2.default.createElement(_InfoPart2.default, {
          caption: 'To Date:',
          text: toDate,
          rootStyle: S.INFO_ROOT,
          styleCaption: S.INFO_CAPTION,
          styleText: S.INFO_TEXT
        }),
        _react2.default.createElement(_InfoPart2.default, {
          caption: 'Frequency:',
          text: frequency,
          styleCaption: S.INFO_CAPTION,
          styleText: S.INFO_TEXT
        }),
        this._renderQuandlLink(database_code, dataset_code),
        _isDescr && _react2.default.createElement(
          _OpenClose2.default,
          {
            caption: 'Description',
            isClose: _isDescrClose,
            style: S.DESCR_OC
          },
          _react2.default.createElement(_InfoPart2.default, {
            text: description,
            isHtml: true,
            classText: CL_DESCR,
            rootStyle: S.DESCR_ROOT,
            styleText: S.DESCR_TEXT
          })
        ),
        this._renderNativeLink(linkFn, item)
      );
    }
  }]);
  return PanelDataInfo;
}(_react.Component);

exports.default = PanelDataInfo;
//# sourceMappingURL=PanelDataInfo.js.map