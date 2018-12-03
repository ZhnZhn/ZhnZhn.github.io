'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _class2, _temp, _initialiseProps;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _Type = require('../../constants/Type');

var _DialogCell = require('./DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _NasdaqLink = require('../native-links/NasdaqLink');

var _NasdaqLink2 = _interopRequireDefault(_NasdaqLink);

var _withValidationLoad = require('./decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFromDate = _DateUtils2.default.getFromDate,
    getToDate = _DateUtils2.default.getToDate,
    isYmd = _DateUtils2.default.isYmd;


var ABSENT = "Absent",
    ABSENT_VALIDATION_MSG = "Data Source for this item Absent";

var STYLE = {
  CAPTION_SPAN: {
    display: 'inline-block',
    maxWidth: '295px'
  },
  SOURCE_ROOT: {
    lineHeight: 1.5,
    marginBottom: '0px'
  },
  LINK_SHOW_HIDE: {
    marginBottom: '10px'
  },
  LINK_ROOT: {
    marginTop: '0px',
    marginBottom: '0px',
    lineHeight: 1.5,
    fontWeight: 'bold'
  },
  LINK_CAPTION: {
    color: '#1B75BB',
    display: 'inline-block',
    textAlign: 'right',
    width: '100px',
    paddingRight: '5px',
    fontSize: '16px'
  }
};

var StocksBySectorDialog = (0, _withValidationLoad2.default)(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(StocksBySectorDialog, _Component);

  /*
   static propTypes = {
     isShow  : PropTypes.bool.isRequired,
     data    : PropTypes.object.isRequired,
     store   : PropTypes.object,
     onClose : PropTypes.func.isRequired
   }
  */

  function StocksBySectorDialog(props) {
    (0, _classCallCheck3.default)(this, StocksBySectorDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StocksBySectorDialog.__proto__ || Object.getPrototypeOf(StocksBySectorDialog)).call(this));

    _initialiseProps.call(_this);

    _this.toolbarButtons = [{ caption: 'L', onClick: _this._handleClickLink }];
    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, {
      key: 'load',
      onClick: _this._handleLoad
    }), _react2.default.createElement(_DialogCell2.default.Button.Show, {
      key: 'show',
      onClick: props.data.onShow
    })];
    _this.state = _this._createInitialState(props);
    return _this;
  }

  (0, _createClass3.default)(StocksBySectorDialog, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.data !== nextProps.data) {
        this.setState(this._createInitialState(nextProps));
      }
    }
  }, {
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
          _props$data = _props.data,
          data = _props$data === undefined ? {} : _props$data,
          _data$item = data.item,
          item = _data$item === undefined ? {} : _data$item,
          text = item.text,
          _state = this.state,
          isShowLink = _state.isShowLink,
          initFromDate = _state.initFromDate,
          initToDate = _state.initToDate,
          onTestDate = _state.onTestDate,
          validationMessages = _state.validationMessages,
          _source = this._getItemSource(this.props);

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: text,
          styleCaption: STYLE.CAPTION_SPAN,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.ToolbarButtonCircle, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_DialogCell2.default.Row.Text, {
          styleRoot: STYLE.SOURCE_ROOT,
          caption: 'Source:',
          text: _source
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowLink, style: STYLE.LINK_SHOW_HIDE },
          _react2.default.createElement(
            _DialogCell2.default.Row.Plain,
            { style: STYLE.LINK_ROOT },
            _react2.default.createElement(
              'span',
              { style: STYLE.LINK_CAPTION },
              'Link:'
            ),
            _react2.default.createElement(_NasdaqLink2.default, { item: item, caption: 'NASDAQ' })
          )
        ),
        _react2.default.createElement(_DialogCell2.default.DatesFragment, {
          ref: function ref(c) {
            return _this2.datesFragment = c;
          },
          initFromDate: initFromDate,
          initToDate: initToDate,
          onTestDate: onTestDate
        }),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return StocksBySectorDialog;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._getItemSource = function (props) {
    var _props$data2 = props.data,
        data = _props$data2 === undefined ? {} : _props$data2,
        _data$item2 = data.item,
        item = _data$item2 === undefined ? {} : _data$item2,
        _item$id = item.id,
        id = _item$id === undefined ? '' : _item$id,
        arr = id.split('/');

    if (arr.length < 2) {
      return ABSENT;
    } else {
      return arr[0];
    }
  };

  this._createInitialState = function (props) {
    var _props$data3 = props.data,
        data = _props$data3 === undefined ? {} : _props$data3,
        fromDate = data.fromDate,
        initToDate = data.initToDate,
        onTestDate = data.onTestDate,
        _isShowLink = _this3._getItemSource(props) !== ABSENT ? false : true;

    return {
      isShowLink: _isShowLink,
      initFromDate: fromDate || getFromDate(2),
      initToDate: initToDate || getToDate(),
      onTestDate: onTestDate || isYmd,
      validationMessages: []
    };
  };

  this._handleClickLink = function () {
    _this3.setState({ isShowLink: !_this3.state.isShowLink });
  };

  this._handleLoad = function () {
    var validationMessages = _this3._getValidationMessages();
    if (validationMessages.isValid) {
      var _props2 = _this3.props,
          data = _props2.data,
          onClose = _props2.onClose,
          _data$item3 = data.item,
          item = _data$item3 === undefined ? {} : _data$item3,
          browserType = data.browserType,
          chartContainerType = data.chartContainerType,
          dialogProps = data.dialogProps,
          id = item.id,
          text = item.text,
          _datesFragment$getVal = _this3.datesFragment.getValues(),
          fromDate = _datesFragment$getVal.fromDate,
          toDate = _datesFragment$getVal.toDate,
          _source = _this3._getItemSource(_this3.props),
          option = (0, _extends3.default)({
        title: text,
        value: id,
        item: item,
        fromDate: fromDate,
        toDate: toDate,
        loadId: _Type.LoadType.WL,
        id: id,
        linkFn: 'NASDAQ',
        columnName: 'Close',
        seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close'],
        dataSource: '(Code: ' + _source + ')'
      }, dialogProps);

      _ChartActions2.default.loadStock({ chartType: chartContainerType, browserType: browserType }, option);
      onClose();
    }
    _this3._updateValidationMessages(validationMessages);
  };

  this._getValidationMessages = function () {
    var msg = [];

    if (_this3._getItemSource(_this3.props) === ABSENT) {
      msg.push(ABSENT_VALIDATION_MSG);
    }

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
    if (_this3.state.validationMessages.length > 0) {
      _this3.setState({ validationMessages: _this3._getValidationMessages() });
    }
    _this3.props.onClose();
  };
}, _temp)) || _class;

exports.default = StocksBySectorDialog;
//# sourceMappingURL=StocksBySectorDialog.js.map