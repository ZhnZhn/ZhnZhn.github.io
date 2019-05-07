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

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ModalPopup = require('../zhn-moleculs/ModalPopup');

var _ModalPopup2 = _interopRequireDefault(_ModalPopup);

var _SpanValue = require('../zhn-span/SpanValue');

var _SpanValue2 = _interopRequireDefault(_SpanValue);

var _SpanDate = require('../zhn-span/SpanDate');

var _SpanDate2 = _interopRequireDefault(_SpanDate);

var _SpanLabel = require('../zhn-span/SpanLabel');

var _SpanLabel2 = _interopRequireDefault(_SpanLabel);

var _DateField = require('../zhn/DateField');

var _DateField2 = _interopRequireDefault(_DateField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var isDmy = _DateUtils2.default.isDmy;


var S = {
  ROOT: {
    position: 'absolute',
    top: 25,
    left: 0,
    zIndex: 10,
    width: 'auto',

    backgroundColor: 'inherit',
    border: '2px solid #1b2836',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 12,
    cursor: 'auto'
  },
  ROW: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  DATE: {
    display: 'inline-block',
    paddingLeft: 16,
    whiteSpace: 'nowrap'
  },
  ROW_INPUT: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8
  },
  DATE_FIELD: {
    width: 120,
    marginLeft: 8,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  MSG: {
    color: '#f44336',
    fontWeight: 'bold'
  }
};

var _isNotAdminMode = function _isNotAdminMode(isAdminMode, isDenyToChange) {
  var _isAdminMode = typeof isAdminMode == 'function' ? isAdminMode() : typeof isAdminMode == 'boolean' ? isAdminMode : false;
  return !_isAdminMode || isDenyToChange;
};

var RowValueDate = function RowValueDate(_ref) {
  var value = _ref.value,
      date = _ref.date;
  return _react2.default.createElement(
    'div',
    { style: S.ROW },
    _react2.default.createElement(_SpanValue2.default, { value: value }),
    _react2.default.createElement(_SpanDate2.default, { date: date, style: S.DATE })
  );
};

var ModalValueMoving = function (_Component) {
  (0, _inherits3.default)(ModalValueMoving, _Component);

  function ModalValueMoving() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalValueMoving);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = ModalValueMoving.__proto__ || Object.getPrototypeOf(ModalValueMoving)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      msgDateTo: ''
    }, _this._handleEnterDate = function (dateTo) {
      if (_this.dateToComp.isValid()) {
        var isUpdated = _this.props.updateDateTo(dateTo);
        if (isUpdated) {
          _this.setState({ msgDateTo: '' });
        } else {
          _this.setState({ msgDateTo: 'No data for ' + dateTo });
        }
      }
    }, _this._refDateToComp = function (comp) {
      return _this.dateToComp = comp;
    }, _this._renderAdmin = function (date, msgDateTo) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'label',
          { style: S.ROW_INPUT },
          _react2.default.createElement(_SpanLabel2.default, { label: 'CompareTo:' }),
          _react2.default.createElement(_DateField2.default, {
            ref: _this._refDateToComp,
            rootStyle: S.DATE_FIELD,
            initValue: date,
            placeholder: 'DD-MM-YYYY',
            errorMsg: 'DD-MM-YYYY',
            onTest: isDmy,
            onEnter: _this._handleEnterDate
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { style: S.MSG },
            msgDateTo
          )
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /*
  static propTypes = {
    valueMoving: PropTypes.shape({
      value: PropTypes.string,
      date: PropTypes.string,
      valueTo: PropTypes.string,
      dateTo: PropTypes.string,
      isDenyToChange: PropTypes.bool
    }),
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    msgDateTo: PropTypes.string,
    updateDateTo: PropTypes.func
  }
  */


  (0, _createClass3.default)(ModalValueMoving, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props !== prevProps) {
        this.setState({ msgDateTo: '' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          onClose = _props.onClose,
          valueMoving = _props.valueMoving,
          isAdminMode = _props.isAdminMode,
          value = valueMoving.value,
          date = valueMoving.date,
          valueTo = valueMoving.valueTo,
          dateTo = valueMoving.dateTo,
          isDenyToChange = valueMoving.isDenyToChange,
          msgDateTo = this.state.msgDateTo;

      return _react2.default.createElement(
        _ModalPopup2.default,
        {
          isShow: isShow,
          style: S.ROOT,
          onClose: onClose
        },
        _react2.default.createElement(RowValueDate, { value: value, date: date }),
        _react2.default.createElement(RowValueDate, { value: valueTo, date: dateTo }),
        _isNotAdminMode(isAdminMode, isDenyToChange) ? null : this._renderAdmin(date, msgDateTo)
      );
    }
  }]);
  return ModalValueMoving;
}(_react.Component);

exports.default = ModalValueMoving;
//# sourceMappingURL=ModalValueMoving.js.map