'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _ChartExportConfig = require('../../charts/ChartExportConfig');

var _ChartExportConfig2 = _interopRequireDefault(_ChartExportConfig);

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _ZhSelect = require('../ZhSelect');

var _ZhSelect2 = _interopRequireDefault(_ZhSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var STYLE = {
  GAP_BETWEEN_GROUP: {
    marginTop: '10px'
  },
  LABEL_WIDTH: {
    color: '#1B75BB',
    display: 'inline-block',
    textAlign: 'right',
    width: '100px',
    paddingRight: '5px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  LABEL_HEIGHT: {
    color: '#1B75BB',
    display: 'inline-block',
    paddingRight: '5px',
    paddingLeft: '3px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  INPUT_NUMBER: {
    marginLeft: '0px',
    height: '30px'
  },
  INPUT_TEXT: {
    width: '250px',
    marginLeft: '0px',
    height: '30px'
  }
};

var CustomizeExportDialog = _react2.default.createClass({
  displayName: 'CustomizeExportDialog',
  getInitialState: function getInitialState() {
    this.exportStyle = {};
    this.toolbarButtons = [{ caption: 'D', onClick: this._handlerClickDimension }, { caption: 'T', onClick: this._handlerClickTitle }, { caption: 'S', onClick: this._handlerClickStyle }];
    this.optionStyles = _ChartExportConfig2.default.createOptionStyles();
    return {
      isShowDimension: true,
      isShowTitle: true,
      isShowStyle: true
    };
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },
  _handlerClickDimension: function _handlerClickDimension() {
    this.setState({ isShowDimension: !this.state.isShowDimension });
  },
  _handlerClickTitle: function _handlerClickTitle() {
    this.setState({ isShowTitle: !this.state.isShowTitle });
  },
  _handlerClickStyle: function _handlerClickStyle() {
    this.setState({ isShowStyle: !this.state.isShowStyle });
  },
  _handlerSelectStyle: function _handlerSelectStyle(item) {
    this.exportStyle = item.value;
  },
  _handlerExport: function _handlerExport() {
    var _props = this.props;
    var data = _props.data;
    var onClose = _props.onClose;
    var chart = data.chart;
    var fn = data.fn;


    var _inputOption = {
      chart: {
        width: this.inputWidth.getValue(),
        height: this.inputHeight.getValue()
      },
      title: {
        text: this.inputTitle.getValue()
      },
      subtitle: {
        text: this.inputSubtitle.getValue()
      }
    };
    var _customOption = (0, _merge2.default)(_inputOption, this.exportStyle);

    fn.apply(chart, [null, _customOption]);
    onClose();
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var isShow = _props2.isShow;
    var data = _props2.data;
    var onClose = _props2.onClose;
    var chart = data.chart;
    var chartWidth = chart.chartWidth;
    var chartHeight = chart.chartHeight;
    var options = chart.options;
    var title = options.title.text;
    var subtitle = options.subtitle.text;
    var _state = this.state;
    var isShowDimension = _state.isShowDimension;
    var isShowTitle = _state.isShowTitle;
    var isShowStyle = _state.isShowStyle;
    var commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Export',
      onClick: this._handlerExport
    })];

    return _react2.default.createElement(
      _ModalDialog2.default,
      {
        caption: 'Customize Export Chart',
        isShow: isShow,
        commandButtons: commandButtons,
        onClose: onClose
      },
      _react2.default.createElement(_ToolbarButtonCircle2.default, {
        buttons: this.toolbarButtons
      }),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isShowDimension },
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv, key: '1' },
          _react2.default.createElement(
            'span',
            { style: STYLE.LABEL_WIDTH },
            'Dimension:'
          ),
          _react2.default.createElement(
            'span',
            { style: STYLE.LABEL_HEIGHT },
            'Width:'
          ),
          _react2.default.createElement(_InputText2.default, {
            ref: function ref(c) {
              return _this.inputWidth = c;
            },
            initValue: chartWidth,
            style: STYLE.INPUT_NUMBER
          }),
          _react2.default.createElement(
            'span',
            { style: STYLE.LABEL_HEIGHT },
            'Height:'
          ),
          _react2.default.createElement(_InputText2.default, {
            ref: function ref(c) {
              return _this.inputHeight = c;
            },
            initValue: chartHeight,
            style: STYLE.INPUT_NUMBER
          })
        )
      ),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isShowTitle },
        _react2.default.createElement(
          'div',
          { style: Object.assign({}, styles.rowDiv, STYLE.GAP_BETWEEN_GROUP), key: '2' },
          _react2.default.createElement(
            'span',
            { style: STYLE.LABEL_WIDTH },
            'Title:'
          ),
          _react2.default.createElement(_InputText2.default, {
            ref: function ref(c) {
              return _this.inputTitle = c;
            },
            initValue: title,
            style: STYLE.INPUT_TEXT
          })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv, key: '3' },
          _react2.default.createElement(
            'span',
            { style: STYLE.LABEL_WIDTH },
            'Subtitle:'
          ),
          _react2.default.createElement(_InputText2.default, {
            ref: function ref(c) {
              return _this.inputSubtitle = c;
            },
            initValue: subtitle,
            style: STYLE.INPUT_TEXT
          })
        )
      ),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isShowStyle },
        _react2.default.createElement(
          'div',
          { style: Object.assign({}, styles.rowDiv, STYLE.GAP_BETWEEN_GROUP), key: '4' },
          _react2.default.createElement(
            'span',
            { style: STYLE.LABEL_WIDTH },
            'Style:'
          ),
          _react2.default.createElement(_ZhSelect2.default, {
            width: '250',
            options: this.optionStyles,
            placeholder: 'Default',
            onSelect: this._handlerSelectStyle
          })
        )
      )
    );
  }
});

exports.default = CustomizeExportDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\CustomizeExportDialog.js.map