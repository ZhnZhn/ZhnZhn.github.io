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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartExportConfig = require('../../charts/ChartExportConfig');

var _ChartExportConfig2 = _interopRequireDefault(_ChartExportConfig);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _InputSelect = require('../zhn-select/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
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

var CustomizeExportDialog = function (_Component) {
  (0, _inherits3.default)(CustomizeExportDialog, _Component);

  function CustomizeExportDialog(props) {
    (0, _classCallCheck3.default)(this, CustomizeExportDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CustomizeExportDialog.__proto__ || Object.getPrototypeOf(CustomizeExportDialog)).call(this));

    _this._handleClickDimension = function () {
      _this.setState({ isShowDimension: !_this.state.isShowDimension });
    };

    _this._handleClickTitle = function () {
      _this.setState({ isShowTitle: !_this.state.isShowTitle });
    };

    _this._handleClickStyle = function () {
      _this.setState({ isShowStyle: !_this.state.isShowStyle });
    };

    _this._handleSelectStyle = function (item) {
      _this.exportStyle = item.value;
    };

    _this._handleExport = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          chart = data.chart,
          fn = data.fn;


      var _inputOption = {
        chart: {
          width: _this.inputWidth.getValue(),
          height: _this.inputHeight.getValue()
        },
        title: {
          text: _this.inputTitle.getValue()
        },
        subtitle: {
          text: _this.inputSubtitle.getValue()
        }
        //const _customOption = merge(_inputOption, this.exportStyle);
      };var _customOption = _ChartExportConfig2.default.merge(true, _inputOption, _this.exportStyle);

      fn.apply(chart, [null, _customOption]);
      onClose();
    };

    _this.exportStyle = {};
    _this.toolbarButtons = [{ caption: 'D', onClick: _this._handleClickDimension }, { caption: 'T', onClick: _this._handleClickTitle }, { caption: 'S', onClick: _this._handleClickStyle }];
    _this.optionStyles = _ChartExportConfig2.default.createOptionStyles();
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Flat, {
      caption: 'Export'
      //accessKey="x"
      , isPrimary: true,
      onClick: _this._handleExport
    })];
    _this.state = {
      isShowDimension: true,
      isShowTitle: true,
      isShowStyle: true
    };
    return _this;
  }

  (0, _createClass3.default)(CustomizeExportDialog, [{
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
          onClose = _props.onClose,
          chart = data.chart,
          chartWidth = chart.chartWidth,
          chartHeight = chart.chartHeight,
          options = chart.options,
          title = options.title.text,
          subtitle = options.subtitle.text,
          _state = this.state,
          isShowDimension = _state.isShowDimension,
          isShowTitle = _state.isShowTitle,
          isShowStyle = _state.isShowStyle;


      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Customize Export Chart',
          isShow: isShow,
          commandButtons: this._commandButtons,
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
            { style: _DialogStyles2.default.rowDiv },
            _react2.default.createElement(
              'span',
              { style: S.LABEL_WIDTH },
              'Dimension:'
            ),
            _react2.default.createElement(
              'span',
              { style: S.LABEL_HEIGHT },
              'Width:'
            ),
            _react2.default.createElement(_InputText2.default, {
              ref: function ref(c) {
                return _this2.inputWidth = c;
              },
              initValue: chartWidth,
              style: S.INPUT_NUMBER
            }),
            _react2.default.createElement(
              'span',
              { style: S.LABEL_HEIGHT },
              'Height:'
            ),
            _react2.default.createElement(_InputText2.default, {
              ref: function ref(c) {
                return _this2.inputHeight = c;
              },
              initValue: chartHeight,
              style: S.INPUT_NUMBER
            })
          )
        ),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowTitle },
          _react2.default.createElement(
            'div',
            { style: (0, _extends3.default)({}, _DialogStyles2.default.rowDiv, S.GAP_BETWEEN_GROUP) },
            _react2.default.createElement(
              'span',
              { style: S.LABEL_WIDTH },
              'Title:'
            ),
            _react2.default.createElement(_InputText2.default, {
              ref: function ref(c) {
                return _this2.inputTitle = c;
              },
              initValue: title,
              style: S.INPUT_TEXT
            })
          ),
          _react2.default.createElement(
            'div',
            { style: _DialogStyles2.default.rowDiv },
            _react2.default.createElement(
              'span',
              { style: S.LABEL_WIDTH },
              'Subtitle:'
            ),
            _react2.default.createElement(_InputText2.default, {
              ref: function ref(c) {
                return _this2.inputSubtitle = c;
              },
              initValue: subtitle,
              style: S.INPUT_TEXT
            })
          )
        ),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowStyle },
          _react2.default.createElement(
            'div',
            { style: (0, _extends3.default)({}, _DialogStyles2.default.rowDiv, S.GAP_BETWEEN_GROUP) },
            _react2.default.createElement(
              'span',
              { style: S.LABEL_WIDTH },
              'Style:'
            ),
            _react2.default.createElement(_InputSelect2.default, {
              width: '250',
              options: this.optionStyles,
              placeholder: 'Default',
              onSelect: this._handleSelectStyle
            })
          )
        )
      );
    }
  }]);
  return CustomizeExportDialog;
}(_react.Component);

exports.default = CustomizeExportDialog;
//# sourceMappingURL=CustomizeExportDialog.js.map