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

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _RowText = require('./RowText');

var _RowText2 = _interopRequireDefault(_RowText);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _NasdaqLink = require('../native-links/NasdaqLink');

var _NasdaqLink2 = _interopRequireDefault(_NasdaqLink);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _withValidationLoad = require('./decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  function StocksBySectorDialog(props) {
    (0, _classCallCheck3.default)(this, StocksBySectorDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StocksBySectorDialog.__proto__ || Object.getPrototypeOf(StocksBySectorDialog)).call(this));

    _initialiseProps.call(_this);

    _this.toolbarButtons = [{ caption: 'L', onClick: _this._handleClickLink }];
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
          onShow = data.onShow,
          text = item.text,
          _state = this.state,
          isShowLink = _state.isShowLink,
          initFromDate = _state.initFromDate,
          initToDate = _state.initToDate,
          onTestDate = _state.onTestDate,
          validationMessages = _state.validationMessages,
          _commandButtons = [_react2.default.createElement(_ActionButton2.default, {
        key: 'a',
        type: 'TypeC',
        caption: 'Load',
        onClick: this._handleLoad
      }), _react2.default.createElement(_ActionButton2.default, {
        key: 'b',
        type: 'TypeC',
        caption: 'Show',
        onClick: onShow
      })],
          _source = this._getItemSource(this.props);

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: text,
          styleCaption: STYLE.CAPTION_SPAN,
          isShow: isShow,
          commandButtons: _commandButtons,
          onClose: this._handleClose
        },
        _react2.default.createElement(_ToolbarButtonCircle2.default, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_RowText2.default, {
          caption: 'Source:',
          text: _source,
          styleRoot: STYLE.SOURCE_ROOT
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowLink, style: STYLE.LINK_SHOW_HIDE },
          _react2.default.createElement(
            _Row2.default,
            { style: STYLE.LINK_ROOT },
            _react2.default.createElement(
              'span',
              { style: STYLE.LINK_CAPTION },
              'Link:'
            ),
            _react2.default.createElement(_NasdaqLink2.default, { item: item, caption: 'NASDAQ' })
          )
        ),
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
        _isShowLink = _this3._getItemSource(props) !== ABSENT ? false : true,
        _initFromDate = fromDate ? fromDate : _DateUtils2.default.getFromDate(2),
        _initToDate = initToDate ? initToDate : _DateUtils2.default.getToDate(),
        _onTestDate = onTestDate ? onTestDate : _DateUtils2.default.isValidDate;

    return {
      isShowLink: _isShowLink,
      initFromDate: _initFromDate,
      initToDate: _initToDate,
      onTestDate: _onTestDate,
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
          id = item.id,
          text = item.text,
          _datesFragment$getVal = _this3.datesFragment.getValues(),
          fromDate = _datesFragment$getVal.fromDate,
          toDate = _datesFragment$getVal.toDate,
          _source = _this3._getItemSource(_this3.props),
          option = {
        title: text,
        //subtitle : subtitle,
        value: id,
        //stock: id,
        stock: item,
        fromDate: fromDate,
        toDate: toDate,
        loadId: _Type.LoadType.WL,
        id: id,
        linkFn: 'NASDAQ',
        columnName: 'Close',
        seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close'],
        dataSource: '(Code: ' + _source + ')'
      };

      _ChartActions2.default.loadStock(chartContainerType, browserType, option);
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

process.env.NODE_ENV !== "production" ? StocksBySectorDialog.propTypes = {
  isShow: _react.PropTypes.bool.isRequired,
  data: _react.PropTypes.object.isRequired,
  store: _react.PropTypes.object,
  onClose: _react.PropTypes.func.isRequired
} : void 0;
StocksBySectorDialog.displayName = 'StocksBySectorDialog';

exports.default = StocksBySectorDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\StocksBySectorDialog.js.map