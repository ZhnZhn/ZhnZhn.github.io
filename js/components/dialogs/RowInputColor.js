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

var _class, _temp;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Model = require('../../constants/Model');

var _Model2 = _interopRequireDefault(_Model);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _CellColor = require('../zhn-moleculs/CellColor');

var _CellColor2 = _interopRequireDefault(_CellColor);

var _ModalPalette = require('../zhn-moleculs/ModalPalette');

var _ModalPalette2 = _interopRequireDefault(_ModalPalette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6
  },
  CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 80,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  COLOR: {
    position: 'relative',
    display: 'inline-block',
    height: 32,
    width: 32,
    borderRadius: 2,
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var RowInputColor = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(RowInputColor, _Component);

  function RowInputColor(props) {
    (0, _classCallCheck3.default)(this, RowInputColor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RowInputColor.__proto__ || Object.getPrototypeOf(RowInputColor)).call(this, props));

    _this._hEnter = function (value) {
      _this.props.onEnter(value);
      _this.setState({ value: value });
    };

    _this._hRegCellColor = function (node) {
      _this.cellColorNode = node;
    };

    _this._hClickPallete = function (color, event) {
      if (event.target === _this.cellColorNode) {
        _this.setState(function (prevState) {
          return {
            isShowPallete: !prevState.isShowPallete
          };
        });
      }
    };

    _this._hClosePalette = function (event) {
      _this.setState({ isShowPallete: false });
    };

    var initValue = props.initValue;

    _this.state = {
      initValue: initValue,
      value: initValue,
      isShowPallete: false
    };
    return _this;
  }
  /*
  static propTypes = {
    styleRoot: PropTypes.object,
    styleCaption: PropTypes.object,
    styleInput: PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.string,
    onEnter: PropTypes.func
  }
  */

  (0, _createClass3.default)(RowInputColor, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          styleRoot = _props.styleRoot,
          styleCaption = _props.styleCaption,
          styleInput = _props.styleInput,
          caption = _props.caption,
          _state = this.state,
          isShowPallete = _state.isShowPallete,
          value = _state.value,
          _caption = caption.indexOf(':') !== -1 ? caption : caption + ':',
          _bgColor = { backgroundColor: value };

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, S.ROOT, styleRoot) },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement(
            'span',
            { style: (0, _extends3.default)({}, S.CAPTION, styleCaption) },
            _caption
          ),
          _react2.default.createElement(_InputText2.default, {
            style: (0, _extends3.default)({}, S.INPUT_TEXT, styleInput),
            initValue: value,
            onEnter: this._hEnter
          })
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
            onClickCell: this._hEnter,
            onClose: this._hClosePalette
          })
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(_ref, state) {
      var initValue = _ref.initValue;

      return initValue !== state.initValue ? { initValue: initValue, value: initValue } : null;
    }
  }]);
  return RowInputColor;
}(_react.Component), _class.defaultProps = {
  caption: 'Color:',
  initValue: '#90ed7d',
  onEnter: function onEnter() {}
}, _temp);
exports.default = RowInputColor;
//# sourceMappingURL=RowInputColor.js.map