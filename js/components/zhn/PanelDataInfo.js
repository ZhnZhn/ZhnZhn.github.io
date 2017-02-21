'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var PanelDataInfo = function (_Component) {
  _inherits(PanelDataInfo, _Component);

  function PanelDataInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PanelDataInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PanelDataInfo.__proto__ || Object.getPrototypeOf(PanelDataInfo)).call.apply(_ref, [this].concat(args))), _this), _this._renderQuandlLink = function (dbCode, dsCode) {
      if (!dbCode || !dsCode) {
        return null;
      } else {
        var Comp = _RouterNativeLink2.default['QUANDL'];
        return _react2.default.createElement(Comp, { dbCode: dbCode, dsCode: dsCode });
      }
    }, _this._renderNativeLink = function (linkFn, item) {
      var Comp = _RouterNativeLink2.default[linkFn];
      if (typeof Comp !== 'undefined') {
        return _react2.default.createElement(Comp, { item: item });
      } else {
        return null;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PanelDataInfo, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          info = _props.info,
          _props$zhInfo = _props.zhInfo,
          zhInfo = _props$zhInfo === undefined ? {} : _props$zhInfo,
          onClickChart = _props.onClickChart,
          name = info.name,
          newest_available_date = info.newest_available_date,
          oldest_available_date = info.oldest_available_date,
          frequency = info.frequency,
          database_code = info.database_code,
          dataset_code = info.dataset_code,
          _info$description = info.description,
          description = _info$description === undefined ? '' : _info$description,
          item = zhInfo.item,
          linkFn = zhInfo.linkFn,
          styleShow = isShow ? styles.rootShow : styles.rootHide,
          _isDescriptionClose = description.length > 200 ? true : false;

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
        _react2.default.createElement(
          _OpenClose2.default,
          {
            caption: 'Description',
            isClose: _isDescriptionClose,
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