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

var _SubPanel = require('./SubPanel');

var _SubPanel2 = _interopRequireDefault(_SubPanel);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _SvgPlus = require('../zhn/SvgPlus');

var _SvgPlus2 = _interopRequireDefault(_SvgPlus);

var _SvgMinus = require('../zhn/SvgMinus');

var _SvgMinus2 = _interopRequireDefault(_SvgMinus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INIT_SMA = "50",
    INIT_MFI = "14";

var STYLE = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    fontWeight: 'bold',
    width: '48px'
  },
  ROW: {
    paddingTop: '5px'
  },
  fnSpan: function fnSpan(color) {
    return { color: color, paddingLeft: '8px' };
  }
};

var PanelIndicator = function (_Component) {
  (0, _inherits3.default)(PanelIndicator, _Component);

  function PanelIndicator() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PanelIndicator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PanelIndicator.__proto__ || Object.getPrototypeOf(PanelIndicator)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      descr: [],
      mfiDescrs: []
    }, _this._checkIfAlreadyAdded = function (arrObj, id) {
      var result = arrObj.find(function (obj) {
        return obj.id === id;
      });
      if (result === undefined) {
        return false;
      } else {
        return true;
      }
    }, _this._handleAddSma = function () {
      var value = _this.inputSmaComp.getValue(),
          descr = _this.state.descr,
          _id = 'SMA(' + value + ')';


      if (!_this._checkIfAlreadyAdded(descr, _id)) {
        var color = _this.props.onAddSma(value);
        if (color) {
          descr.push({ id: _id, color: color });
          _this.setState({ descr: descr });
        }
      }
    }, _this._handleRemoveSma = function (id) {
      if (_this.props.onRemoveSma(id)) {
        _this.state.descr = _this.state.descr.filter(function (descr) {
          return descr.id !== id;
        });
        _this.setState({ descr: _this.state.descr });
      }
    }, _this._handleRemoveMfi = function (id) {
      _this.props.onRemoveMfi(id);
      _this.state.mfiDescrs = _this.state.mfiDescrs.filter(function (descr) {
        return descr.id !== id;
      });
      _this.setState({ mfiDescrs: _this.state.mfiDescrs });
    }, _this._handleAddMfi = function () {
      var mfiDescrs = _this.state.mfiDescrs,
          _value = _this.inputMfiComp.getValue(),
          _id = 'MFI(' + _value + ')';


      if (!_this._checkIfAlreadyAdded(mfiDescrs, _id)) {
        _this.props.onAddMfi(_value, _id);
        mfiDescrs.push({
          id: _id,
          color: 'green'
        });
        _this.setState({ mfiDescrs: mfiDescrs });
      }
    }, _this._renderIndicators = function () {
      var _descr = _this.state.descr.map(function (descr, index) {
        var id = descr.id,
            color = descr.color;

        return _react2.default.createElement(
          'div',
          { key: id, style: STYLE.ROW },
          _react2.default.createElement(_SvgMinus2.default, {
            onClick: _this._handleRemoveSma.bind(null, id)
          }),
          _react2.default.createElement(
            'span',
            { style: STYLE.fnSpan(color) },
            id
          )
        );
      });
      return _react2.default.createElement(
        'div',
        null,
        _descr
      );
    }, _this._renderMfi = function () {
      var _descr = _this.state.mfiDescrs.map(function (descr, index) {
        var id = descr.id,
            color = descr.color;

        return _react2.default.createElement(
          'div',
          { key: id, style: STYLE.ROW },
          _react2.default.createElement(_SvgMinus2.default, {
            onClick: _this._handleRemoveMfi.bind(null, id)
          }),
          _react2.default.createElement(
            'span',
            { style: STYLE.fnSpan(color) },
            id
          )
        );
      });
      return _react2.default.createElement(
        'div',
        null,
        _descr
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PanelIndicator, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rootStyle = _props.rootStyle,
          isMfi = _props.isMfi;


      var _mfiDom = isMfi ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: STYLE.ROW },
          _react2.default.createElement(
            'span',
            { style: STYLE.CAPTION },
            'MFI'
          ),
          _react2.default.createElement(_InputText2.default, {
            ref: function ref(c) {
              return _this2.inputMfiComp = c;
            },
            initValue: INIT_MFI
          }),
          _react2.default.createElement(_SvgPlus2.default, { onClick: this._handleAddMfi })
        ),
        this._renderMfi()
      ) : null;

      return _react2.default.createElement(
        _SubPanel2.default,
        { style: rootStyle },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { style: STYLE.CAPTION },
            'SMA'
          ),
          _react2.default.createElement(_InputText2.default, {
            ref: function ref(c) {
              return _this2.inputSmaComp = c;
            },
            initValue: INIT_SMA
          }),
          _react2.default.createElement(_SvgPlus2.default, { onClick: this._handleAddSma })
        ),
        this._renderIndicators(),
        _mfiDom
      );
    }
  }]);
  return PanelIndicator;
}(_react.Component);

process.env.NODE_ENV !== "production" ? PanelIndicator.propTypes = {
  rootStyle: _react.PropTypes.object,
  isMfi: _react.PropTypes.bool,
  onAddSma: _react.PropTypes.func,
  onRemoveSma: _react.PropTypes.func,
  onAddMfi: _react.PropTypes.func,
  onRemoveMfi: _react.PropTypes.func
} : void 0;
exports.default = PanelIndicator;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\PanelIndicator.js.map