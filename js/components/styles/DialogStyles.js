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
    marginRight: '5px',
    marginTop: '5px',
    marginLeft: '5px',
    marginBottom: '5px'
  },
  ROW_OC: {
    lineHeight: 'unset',
    marginRight: '5px',
    marginTop: '5px',
    marginLeft: '5px',
    marginBottom: '-4px'
  },
  ROW_SHORT: {
    marginLeft: '12px',
    marginRight: '12px'
  },
  LABEL: {
    color: '#1B75BB',
    display: 'inline-block',
    //verticalAlign: 'top',
    textAlign: 'right',
    width: '100px',
    paddingRight: '5px',
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

  crRowLabelStyle: function crRowLabelStyle() {
    var isShowLabels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var rowStyle = isShowLabels ? (0, _extends3.default)({}, S.ROW) : (0, _extends3.default)({}, S.ROW, S.ROW_SHORT),
        labelStyle = isShowLabels ? (0, _extends3.default)({}, S.LABEL) : (0, _extends3.default)({}, S.LABEL, S.NONE);
    return { rowStyle: rowStyle, labelStyle: labelStyle };
  },

  crRowOcSelectStyle: function crRowOcSelectStyle() {
    var isShowLabels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var rowStyle = isShowLabels ? (0, _extends3.default)({}, S.ROW_OC) : (0, _extends3.default)({}, S.ROW_OC, S.ROW_SHORT),
        labelStyle = isShowLabels ? (0, _extends3.default)({}, S.LABEL) : (0, _extends3.default)({}, S.LABEL, S.NONE);
    return { rowStyle: rowStyle, labelStyle: labelStyle };
  },

  //ValidationMessagesFragment
  validationContainer: {
    paddingLeft: '10px',
    paddingTop: '5px',
    color: '#F44336'
  },
  validationMessageNumber: {
    display: 'inline-block',
    width: '22px',
    height: '22px',
    border: 'solid 2px #F44336',
    borderRadius: '50%',
    textAlign: 'center',
    marginRight: '5px'
  }

};

exports.default = DialogStyles;
//# sourceMappingURL=DialogStyles.js.map