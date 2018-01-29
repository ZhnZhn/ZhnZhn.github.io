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

var _ButtonTab = require('./ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

var _InfoPart = require('./InfoPart');

var _InfoPart2 = _interopRequireDefault(_InfoPart);

var _OpenClose = require('./OpenClose2');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DESCR_CSS_CLASS = 'info__descr';

var styles = {
  rootShow: {
    position: 'relative',
    display: 'block',
    paddingTop: '34px',
    paddingRight: '20px',
    paddingLeft: '8px'
  },
  rootHide: {
    position: 'relative',
    display: 'none'
  },
  rootStyle: {
    marginTop: '4px'
  },
  rootStyleDescription: {
    marginTop: '10px'
  },
  label: {
    display: 'inline-block',
    color: '#1B75BB',
    width: '110px',
    textAlign: 'right',
    paddingRight: '5px',
    fontWeight: 'bold'
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize'
  },
  description: {
    paddingTop: '12px'
  },
  textDescr: {
    color: 'gray',
    fontWeight: 'bold'
  }
};

var _isWithoutLink = function _isWithoutLink() {
  var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _item$id = item.id,
      id = _item$id === undefined ? '' : _item$id,
      arr = id.split('/');


  if (arr[0] === 'LSE') {
    return true;
  }
  return false;
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
      if (typeof Comp !== 'undefined') {
        return _react2.default.createElement(Comp, { item: item });
      } else {
        return null;
      }
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
          newest_available_date = info.newest_available_date,
          oldest_available_date = info.oldest_available_date,
          frequency = info.frequency,
          database_code = info.database_code,
          dataset_code = info.dataset_code,
          description = info.description,
          item = zhInfo.item,
          linkFn = zhInfo.linkFn,
          styleShow = isShow ? styles.rootShow : styles.rootHide,
          _isDescr = description ? true : false,
          _isDescrClose = _isDescr && description.length > 200 ? true : false;

      return _react2.default.createElement(
        'div',
        { style: styleShow },
        _react2.default.createElement(_ButtonTab2.default, {
          caption: 'Chart',
          isShow: false,
          onClick: onClickChart
        }),
        _react2.default.createElement(_InfoPart2.default, {
          caption: '',
          text: name,
          styleCaption: { display: 'none' },
          styleText: styles.text
        }),
        _react2.default.createElement(_InfoPart2.default, {
          caption: 'Newest Date: ',
          text: newest_available_date,
          rootStyle: styles.rootStyle,
          styleCaption: styles.label,
          styleText: styles.text
        }),
        _react2.default.createElement(_InfoPart2.default, {
          caption: 'Oldest Date: ',
          text: oldest_available_date,
          styleCaption: styles.label,
          styleText: styles.text
        }),
        _react2.default.createElement(_InfoPart2.default, {
          caption: 'Frequency: ',
          text: frequency,
          styleCaption: styles.label,
          styleText: styles.text
        }),
        this._renderQuandlLink(database_code, dataset_code),
        _isDescr && _react2.default.createElement(
          _OpenClose2.default,
          {
            caption: 'Description',
            isClose: _isDescrClose,
            style: styles.description
          },
          _react2.default.createElement(_InfoPart2.default, {
            caption: '',
            text: description,
            isHtml: true,
            classText: DESCR_CSS_CLASS,
            rootStyle: styles.rootStyleDescription,
            styleText: styles.textDescr
          })
        ),
        this._renderNativeLink(linkFn, item)
      );
    }
  }]);
  return PanelDataInfo;
}(_react.Component);

exports.default = PanelDataInfo;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\PanelDataInfo.js.map