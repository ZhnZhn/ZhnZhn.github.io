'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ButtonTab = require('./ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

var _InfoPart = require('./InfoPart');

var _InfoPart2 = _interopRequireDefault(_InfoPart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DESCR_CSS_CLASS = 'info__descr',
    LINK_CODE_CLASS = 'descr__quandl-link',
    LINK_CODE_CAPTION = 'Quandl Data Link',
    QUANDL_DATA_BASE = 'https://www.quandl.com/data/';

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
  codeLink: {
    display: 'inline-block',
    paddingTop: '10px'
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize'
  },
  textDescr: {
    color: 'gray',
    fontWeight: 'bold'
  }
};

var EURONEXT_BASE = 'https://www.euronext.com/en/products/equities/';

var RouterFnLink = {
  EURONEXT: function EURONEXT(item) {
    return _react2.default.createElement(
      'a',
      {
        className: 'native-link',
        style: styles.codeLink,
        href: '' + EURONEXT_BASE + item.isin + '-' + item.market
      },
      'Euronext Link ' + item.caption
    );
  }
};

var PanelDataInfo = _react2.default.createClass({
  displayName: 'PanelDataInfo',
  _renderLinkCode: function _renderLinkCode(dbCode, dsCode) {
    if (!dbCode || !dsCode) {
      return undefined;
    }
    return _react2.default.createElement(
      'a',
      {
        className: LINK_CODE_CLASS,
        style: styles.codeLink,
        href: '' + QUANDL_DATA_BASE + dbCode + '/' + dsCode
      },
      LINK_CODE_CAPTION + ' ' + dbCode + '/' + dsCode
    );
  },
  _renderNativeLink: function _renderNativeLink(linkFn, item) {
    var fnLink = RouterFnLink[linkFn];
    if (typeof fnLink === 'function') {
      return fnLink(item);
    } else {
      return undefined;
    }
  },
  render: function render() {
    var _props = this.props,
        isShow = _props.isShow,
        info = _props.info,
        zhInfo = _props.zhInfo,
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
        styleShow = isShow ? styles.rootShow : styles.rootHide;


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
      this._renderLinkCode(database_code, dataset_code),
      _react2.default.createElement(_InfoPart2.default, {
        caption: '',
        text: description,
        isHtml: true,
        classText: DESCR_CSS_CLASS,
        rootStyle: styles.rootStyleDescription,
        styleText: styles.textDescr
      }),
      this._renderNativeLink(linkFn, item)
    );
  }
});

exports.default = PanelDataInfo;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\PanelDataInfo.js.map