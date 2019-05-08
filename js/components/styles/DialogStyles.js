'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  //Dialogs, DatesFragments
  ROW: {
    //display: 'block',
    display: 'flex',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5
  },
  ROW_OC: {
    lineHeight: 'unset',
    marginRight: 5,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: -4
  },
  ROW_SHORT: {
    marginLeft: 12,
    marginRight: 12
  },
  LABEL: {
    color: '#1b75bb',
    display: 'inline-block',
    //verticalAlign: 'top',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none'
  },
  NONE: {
    display: 'none'
  }
};

var DialogStyles = {
  //Dialogs, DatesFragments
  rowDiv: (0, _extends3.default)({}, S.ROW),
  labelSpan: (0, _extends3.default)({}, S.LABEL),

  crRowCaption: function crRowCaption(caption) {
    return caption.indexOf(':') === -1 && caption !== '' ? caption + ':' : caption;
  },
  crRowLabelStyle: function crRowLabelStyle() {
    var isShowLabels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var captionStyle = arguments[1];

    var rowStyle = isShowLabels ? (0, _extends3.default)({}, S.ROW) : (0, _extends3.default)({}, S.ROW, S.ROW_SHORT),
        labelStyle = isShowLabels ? (0, _extends3.default)({}, S.LABEL, captionStyle) : (0, _extends3.default)({}, S.LABEL, S.NONE);
    return { rowStyle: rowStyle, labelStyle: labelStyle };
  },

  crRowOcSelectStyle: function crRowOcSelectStyle() {
    var isShowLabels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var captionStyle = arguments[1];

    var rowStyle = isShowLabels ? (0, _extends3.default)({}, S.ROW_OC) : (0, _extends3.default)({}, S.ROW_OC, S.ROW_SHORT),
        labelStyle = isShowLabels ? (0, _extends3.default)({}, S.LABEL, captionStyle) : (0, _extends3.default)({}, S.LABEL, S.NONE);
    return { rowStyle: rowStyle, labelStyle: labelStyle };
  },

  //ValidationMessagesFragment
  VM_CONT: {
    paddingLeft: 10,
    paddingTop: 5,
    color: '#f44336'
  },
  VM_MSG_NUMBER: {
    display: 'inline-block',
    width: 22,
    height: 22,
    border: 'solid 2px #F44336',
    borderRadius: '50%',
    textAlign: 'center',
    marginRight: 5
  },
  VM_MSG: {
    whiteSpace: 'pre',
    fontWeight: 'bold'
  }

};

exports.default = DialogStyles;
//# sourceMappingURL=DialogStyles.js.map