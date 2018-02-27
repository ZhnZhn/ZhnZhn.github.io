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

var _SpanValue = require('../zhn-span/SpanValue');

var _SpanValue2 = _interopRequireDefault(_SpanValue);

var _SpanDate = require('../zhn-span/SpanDate');

var _SpanDate2 = _interopRequireDefault(_SpanDate);

var _SpanLabel = require('../zhn-span/SpanLabel');

var _SpanLabel2 = _interopRequireDefault(_SpanLabel);

var _DateField = require('../zhn/DateField');

var _DateField2 = _interopRequireDefault(_DateField);

var _SubPanel = require('./SubPanel');

var _SubPanel2 = _interopRequireDefault(_SubPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var isDmy = _DateUtils2.default.isDmy;


var STYLE = {
  SUB_PANEL: {
    position: 'absolute',
    top: '32px',
    left: '0px',
    width: 'auto'
  },
  ROW: {
    //width: '230px'
    display: 'flex',
    justifyContent: 'space-between'
  },
  DATE: {
    display: 'inline-block',
    //float: 'right',
    paddingLeft: '16px',
    whiteSpace: 'nowrap'
  },
  ROW_INPUT: {
    display: 'block',
    paddingTop: '8px'
  },
  DATE_FIELD: {
    width: '120px',
    marginLeft: '8px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  MSG: {
    color: '#f44336',
    fontWeight: 'bold'
  }

};

var PanelValueMoving = function (_Component) {
  (0, _inherits3.default)(PanelValueMoving, _Component);

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

  function PanelValueMoving(props) {
    (0, _classCallCheck3.default)(this, PanelValueMoving);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PanelValueMoving.__proto__ || Object.getPrototypeOf(PanelValueMoving)).call(this));

    _this._handleEnterDate = function (dateTo) {
      if (_this.dateToComp.isValid()) {
        var isUpdated = _this.props.updateDateTo(dateTo);
        if (isUpdated) {
          _this.setState({ msgDateTo: '' });
        } else {
          _this.setState({ msgDateTo: 'No data for ' + dateTo });
        }
      }
    };

    _this._renderAdmin = function (isAdminMode, date, msgDateTo, isDenyToChange) {
      if (!isAdminMode || isDenyToChange) {
        return null;
      } else {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            { style: STYLE.ROW_INPUT },
            _react2.default.createElement(_SpanLabel2.default, { label: 'CompareTo:' }),
            _react2.default.createElement(_DateField2.default, {
              ref: function ref(comp) {
                return _this.dateToComp = comp;
              },
              rootStyle: STYLE.DATE_FIELD,
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
              { style: STYLE.MSG },
              msgDateTo
            )
          )
        );
      }
    };

    _this.state = {
      msgDateTo: ''
    };
    return _this;
  }

  (0, _createClass3.default)(PanelValueMoving, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({ msgDateTo: '' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          valueMoving = _props.valueMoving,
          isAdminMode = _props.isAdminMode,
          value = valueMoving.value,
          date = valueMoving.date,
          valueTo = valueMoving.valueTo,
          dateTo = valueMoving.dateTo,
          isDenyToChange = valueMoving.isDenyToChange,
          _isAdminMode = typeof isAdminMode == 'function' ? isAdminMode() : typeof isAdminMode == 'boolean' ? isAdminMode : false,
          msgDateTo = this.state.msgDateTo;

      return _react2.default.createElement(
        _SubPanel2.default,
        { style: STYLE.SUB_PANEL },
        _react2.default.createElement(
          'div',
          { style: STYLE.ROW },
          _react2.default.createElement(_SpanValue2.default, { value: value }),
          _react2.default.createElement(_SpanDate2.default, { date: date, style: STYLE.DATE })
        ),
        _react2.default.createElement(
          'div',
          { style: STYLE.ROW },
          _react2.default.createElement(_SpanValue2.default, { value: valueTo }),
          _react2.default.createElement(_SpanDate2.default, { date: dateTo, style: STYLE.DATE })
        ),
        this._renderAdmin(_isAdminMode, date, msgDateTo, isDenyToChange)
      );
    }
  }]);
  return PanelValueMoving;
}(_react.Component);

exports.default = PanelValueMoving;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\PanelValueMoving.js.map