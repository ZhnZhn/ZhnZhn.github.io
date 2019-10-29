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

var _Model = require('../../constants/Model');

var _Model2 = _interopRequireDefault(_Model);

var _HandleF = require('../f-handle/HandleF');

var _HandleF2 = _interopRequireDefault(_HandleF);

var _CellColor = require('../zhn-moleculs/CellColor');

var _CellColor2 = _interopRequireDefault(_CellColor);

var _ModalPalette = require('../zhn-moleculs/ModalPalette');

var _ModalPalette2 = _interopRequireDefault(_ModalPalette);

var _InputSelect = require('../zhn-select/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF = {
  COLOR: '#7cb5ec'
};
var CL = {
  ELL: 'ellipsis'
};
var S = {
  ROOT: {
    paddingLeft: 16,
    paddingBottom: 16
  },
  TITLE: {
    verticalAlign: 'middle',
    color: 'rgb(27, 117, 187)',
    textAlign: 'right',
    width: 100,
    paddingLeft: 4,
    paddingRight: 16,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none'
  },
  COLOR: {
    position: 'relative',
    display: 'inline-block',
    height: 32,
    width: 32,
    borderRadius: 2,
    verticalAlign: 'middle',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  ROW_CHECK_BOX: {
    display: 'inline-block',
    verticalAlign: 'middle',
    paddingLeft: 0
  },
  SELECT: {
    verticalAlign: 'middle',
    marginLeft: 24
  },
  SELECT_OPTIONS: {
    minHeight: 100
  }
};

var SeriaRow = function (_Component) {
  (0, _inherits3.default)(SeriaRow, _Component);

  function SeriaRow() {
    (0, _classCallCheck3.default)(this, SeriaRow);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SeriaRow.__proto__ || Object.getPrototypeOf(SeriaRow)).call(this));

    _this._getColor = function () {
      var colorEntered = _this.state.colorEntered,
          color = _this.props.seria.options.color;

      return colorEntered || color || DF.COLOR;
    };

    _this.isChecked = false;
    _this._hCheck = _HandleF2.default.set('isChecked', true).bind(_this);
    _this._hUnCheck = _HandleF2.default.set('isChecked', false).bind(_this);

    _this._hSelectYAxis = _HandleF2.default.reg('toYAxis').bind(_this);

    _this._hRegCellColor = _HandleF2.default.reg('cellColorNode').bind(_this);
    _this._hEnterColor = _HandleF2.default.enterTo('colorEntered').bind(_this);
    _this._hClosePalette = _HandleF2.default.closeTo('isShowPallete').bind(_this);
    _this._hClickPallete = _HandleF2.default.toggleModalTo('isShowPallete', 'cellColorNode').bind(_this);

    _this.state = {
      isShowPallete: false,
      colorEntered: void 0
    };
    return _this;
  }

  (0, _createClass3.default)(SeriaRow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (typeof onReg === 'function') {
        onReg(this);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var onUnReg = this.props.onUnReg;

      if (typeof onUnReg === 'function') {
        onUnReg(this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var isShowPallete = this.state.isShowPallete,
          _props = this.props,
          _props$seria = _props.seria,
          seria = _props$seria === undefined ? {} : _props$seria,
          yAxisOptions = _props.yAxisOptions,
          name = seria.name,
          _seria$options = seria.options,
          options = _seria$options === undefined ? {} : _seria$options,
          zhValueText = options.zhValueText,
          _name = zhValueText || name,
          _bgColor = { backgroundColor: this._getColor() };


      return _react2.default.createElement(
        'div',
        { style: S.ROOT },
        _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
          rootStyle: S.ROW_CHECK_BOX,
          caption: '',
          onCheck: this._hCheck,
          onUnCheck: this._hUnCheck
        }),
        _react2.default.createElement(
          'span',
          {
            className: CL.ELL,
            style: S.TITLE
          },
          _name
        ),
        _react2.default.createElement(
          _CellColor2.default,
          {
            style: (0, _extends3.default)({}, S.COLOR, _bgColor),
            onReg: this._hRegCellColor,
            onClick: this._hClickPallete
          },
          _react2.default.createElement(_ModalPalette2.default, {
            isShow: isShowPallete,
            model: _Model2.default.palette,
            onClickCell: this._hEnterColor,
            onClose: this._hClosePalette
          })
        ),
        _react2.default.createElement(_InputSelect2.default, {
          placeholder: 'withYAxis',
          width: '150',
          rootStyle: S.SELECT,
          rootOptionsStyle: S.SELECT_OPTIONS,
          options: yAxisOptions,
          onSelect: this._hSelectYAxis
        })
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return {
        isChecked: this.isChecked,
        color: this._getColor(),
        yIndex: this.toYAxis ? this.toYAxis.value : void 0,
        data: this.props.seria.userOptions.data
      };
    }
  }]);
  return SeriaRow;
}(_react.Component);

exports.default = SeriaRow;
//# sourceMappingURL=SeriaRow.js.map