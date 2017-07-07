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

var _class, _class2, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _Type = require('../../constants/Type');

var _ChartType = require('../../constants/ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _Button = require('../dialogs/Button');

var _Button2 = _interopRequireDefault(_Button);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _RowText = require('../dialogs/RowText');

var _RowText2 = _interopRequireDefault(_RowText);

var _withValidationLoad = require('../dialogs/decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadItemDialog = (0, _withValidationLoad2.default)(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(LoadItemDialog, _Component);

  function LoadItemDialog(props) {
    (0, _classCallCheck3.default)(this, LoadItemDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LoadItemDialog.__proto__ || Object.getPrototypeOf(LoadItemDialog)).call(this));

    _initialiseProps.call(_this);

    var _props$data = props.data,
        fromDate = _props$data.fromDate,
        initToDate = _props$data.initToDate,
        onTestDate = _props$data.onTestDate,
        _initFromDate = fromDate ? fromDate : _DateUtils2.default.getFromDate(2),
        _initToDate = initToDate ? initToDate : _DateUtils2.default.getToDate(),
        _onTestDate = onTestDate ? onTestDate : _DateUtils2.default.isValidDate;

    _this._commandButtons = [_react2.default.createElement(_Button2.default.Load, { onClick: _this._handleLoad })];

    _this.state = {
      initFromDate: _initFromDate,
      initToDate: _initToDate,
      onTestDate: _onTestDate,
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(LoadItemDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isShow = _props.isShow,
          data = _props.data,
          caption = data.caption,
          _state = this.state,
          initFromDate = _state.initFromDate,
          initToDate = _state.initToDate,
          onTestDate = _state.onTestDate,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Load Item',
          isShow: isShow,
          commandButtons: this._commandButtons,
          onClose: this._handleClose
        },
        _react2.default.createElement(_RowText2.default, {
          caption: 'Item:',
          text: caption
        }),
        _react2.default.createElement(_DatesFragment2.default, {
          ref: function ref(c) {
            return _this2.datesFragment = c;
          },
          initFromDate: initFromDate,
          initToDate: initToDate,
          onTestDate: onTestDate
        }),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return LoadItemDialog;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._handleLoad = function () {
    var validationMessages = _this3._createValidationMessages();
    if (validationMessages.isValid) {
      var _props2 = _this3.props,
          data = _props2.data,
          onClose = _props2.onClose,
          id = data.id,
          title = data.title,
          subtitle = data.subtitle,
          caption = data.caption,
          columnName = data.columnName,
          dataColumn = data.dataColumn,
          seriaColumnNames = data.seriaColumnNames,
          _datesFragment$getVal = _this3.datesFragment.getValues(),
          fromDate = _datesFragment$getVal.fromDate,
          toDate = _datesFragment$getVal.toDate,
          option = {
        title: title,
        subtitle: subtitle,
        value: caption,
        stock: caption,
        fromDate: fromDate,
        toDate: toDate,
        loadId: _Type.LoadType.WL,
        id: id,
        columnName: columnName,
        dataColumn: dataColumn,
        seriaColumnNames: seriaColumnNames
      };

      _ChartActions2.default.loadStock(_ChartType2.default.WATCH_LIST, _Type.BrowserType.WATCH_LIST, option);
      onClose();
    }
    _this3._updateValidationMessages(validationMessages);
  };

  this._createValidationMessages = function () {
    var msg = [];

    var _datesFragment$getVal2 = _this3.datesFragment.getValidation(),
        isValid = _datesFragment$getVal2.isValid,
        datesMsg = _datesFragment$getVal2.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  };

  this._handleClose = function () {
    _this3._handleWithValidationClose(_this3._createValidationMessages);
    _this3.props.onClose();
  };
}, _temp)) || _class;

process.env.NODE_ENV !== "production" ? LoadItemDialog.propTypes = {
  isShow: _react.PropTypes.bool,
  data: _react.PropTypes.shape({
    fromDate: _react.PropTypes.string,
    initToDate: _react.PropTypes.string,
    onTestDate: _react.PropTypes.func
  }),
  store: _react.PropTypes.object,
  onClose: _react.PropTypes.func
} : void 0;
exports.default = LoadItemDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\LoadItemDialog.js.map