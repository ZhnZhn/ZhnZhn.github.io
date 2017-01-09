'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

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

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

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

var StocksBySectorDialog = _react2.default.createClass(_extends({
  displayName: 'StocksBySectorDialog'
}, _WithValidation2.default, {
  propTypes: {
    isShow: _react2.default.PropTypes.bool.isRequired,
    data: _react2.default.PropTypes.object.isRequired,
    store: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func.isRequired
  },

  _createInitialState: function _createInitialState(props) {
    var _props$data = props.data,
        data = _props$data === undefined ? {} : _props$data,
        _data$item = data.item,
        item = _data$item === undefined ? {} : _data$item,
        fromDate = data.fromDate,
        initToDate = data.initToDate,
        onTestDate = data.onTestDate,
        _item$id = item.id,
        id = _item$id === undefined ? '' : _item$id,
        _isShowLink = id.split('/').length > 1 ? false : true,
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
  },
  getInitialState: function getInitialState() {
    this.toolbarButtons = [{ caption: 'L', onClick: this._handleClickLink }];
    return this._createInitialState(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState(this._createInitialState(nextProps));
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },
  _handleClickLink: function _handleClickLink() {
    this.setState({ isShowLink: !this.state.isShowLink });
  },
  _handlerLoad: function _handlerLoad() {
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var _props = this.props,
          data = _props.data,
          onClose = _props.onClose,
          _data$item2 = data.item,
          item = _data$item2 === undefined ? {} : _data$item2,
          browserType = data.browserType,
          chartContainerType = data.chartContainerType,
          id = item.id,
          text = item.text,
          _datesFragment$getVal = this.datesFragment.getValues(),
          fromDate = _datesFragment$getVal.fromDate,
          toDate = _datesFragment$getVal.toDate,
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
        seriaColumnNames: ['Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close']
      };

      _ChartActions2.default.loadStock(chartContainerType, browserType, option);
      onClose();
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var msg = [];
    var data = this.props.data,
        item = data.item,
        id = item.id,
        _arr = id.split('/');


    if (!(_arr.length > 1)) {
      msg.push(ABSENT_VALIDATION_MSG);
    }

    var _datesFragment$getVal2 = this.datesFragment.getValidation(),
        isValid = _datesFragment$getVal2.isValid,
        datesMsg = _datesFragment$getVal2.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props,
        isShow = _props2.isShow,
        _props2$data = _props2.data,
        data = _props2$data === undefined ? {} : _props2$data,
        _data$item3 = data.item,
        item = _data$item3 === undefined ? {} : _data$item3,
        onShow = data.onShow,
        text = item.text,
        _item$id2 = item.id,
        id = _item$id2 === undefined ? '' : _item$id2,
        _state = this.state,
        isShowLink = _state.isShowLink,
        initFromDate = _state.initFromDate,
        initToDate = _state.initToDate,
        onTestDate = _state.onTestDate,
        validationMessages = _state.validationMessages,
        _commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    }), _react2.default.createElement(_ToolBarButton2.default, {
      key: 'b',
      type: 'TypeC',
      caption: 'Show',
      onClick: onShow
    })],
        _arr = id.split('/'),
        _text = _arr.length > 1 ? id.split('/')[0] : ABSENT;

    return _react2.default.createElement(
      _ModalDialog2.default,
      {
        caption: text,
        styleCaption: STYLE.CAPTION_SPAN,
        isShow: isShow,
        commandButtons: _commandButtons,
        onClose: this._handlerClose
      },
      _react2.default.createElement(_ToolbarButtonCircle2.default, {
        buttons: this.toolbarButtons
      }),
      _react2.default.createElement(_RowText2.default, {
        caption: 'Source:',
        text: _text,
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
          return _this.datesFragment = c;
        },
        initFromDate: initFromDate,
        initToDate: initToDate,
        onTestDate: onTestDate
      }),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = StocksBySectorDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\StocksBySectorDialog.js.map