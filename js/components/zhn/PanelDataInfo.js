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
  render: function render() {
    var _props = this.props;
    var isShow = _props.isShow;
    var onClickChart = _props.onClickChart;
    var info = _props.info;
    var name = info.name;
    var newest_available_date = info.newest_available_date;
    var oldest_available_date = info.oldest_available_date;
    var frequency = info.frequency;
    var database_code = info.database_code;
    var dataset_code = info.dataset_code;
    var description = info.description;
    var styleShow = isShow ? styles.rootShow : styles.rootHide;

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
      })
    );
  }
});

exports.default = PanelDataInfo;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\PanelDataInfo.js.map