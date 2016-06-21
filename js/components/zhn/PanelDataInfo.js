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

var DESCR_CSS_CLASS = 'info__descr';

var styles = {
  rootShow: {
    position: 'relative',
    display: 'block',
    paddingTop: '24px',
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
  label: {
    color: '#1B75BB',
    fontWeight: 'bold'
  },
  text: {
    fontWeight: 'bold'
  },
  textDescr: {
    color: 'gray',
    fontWeight: 'bold'
  }
};

var PanelDataInfo = _react2.default.createClass({
  displayName: 'PanelDataInfo',
  render: function render() {
    var _props = this.props;
    var isShow = _props.isShow;
    var onClickChart = _props.onClickChart;
    var info = _props.info;
    var name = info.name;
    var description = info.description;
    var newest_available_date = info.newest_available_date;
    var oldest_available_date = info.oldest_available_date;
    var frequency = info.frequency;
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
        caption: 'Name: ',
        text: name,
        styleCaption: styles.label,
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
      _react2.default.createElement(_InfoPart2.default, {
        caption: '',
        text: description,
        isHtml: true,
        classText: DESCR_CSS_CLASS,
        rootStyle: styles.rootStyle,
        styleCaption: styles.label,
        styleText: styles.textDescr
      })
    );
  }
});

exports.default = PanelDataInfo;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\PanelDataInfo.js.map