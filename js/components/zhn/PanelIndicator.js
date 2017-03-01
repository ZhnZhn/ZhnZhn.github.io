'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('./ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _InputText = require('./InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _SvgPlus = require('./SvgPlus');

var _SvgPlus2 = _interopRequireDefault(_SvgPlus);

var _SvgMinus = require('./SvgMinus');

var _SvgMinus2 = _interopRequireDefault(_SvgMinus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  rootDiv: {
    position: 'absolute',
    zIndex: 10,
    top: '55px',
    left: '8px',

    backgroundColor: 'rgb(77, 77, 77)',
    border: '2px solid rgb(35, 47, 59)',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',

    padding: '10px',
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  captionSpan: {
    display: 'inline-block',
    color: 'black',
    fontWeight: 'bold',
    width: '48px'
  }
};

var PanelIndicator = function (_Component) {
  _inherits(PanelIndicator, _Component);

  function PanelIndicator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PanelIndicator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PanelIndicator.__proto__ || Object.getPrototypeOf(PanelIndicator)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
      var value = _this.refs.inputSMA.getValue(),
          descr = _this.state.descr,
          _id = 'SMA(' + value + ')';


      if (!_this._checkIfAlreadyAdded(descr, _id)) {
        var color = _this.props.onAddSma(value);
        if (color) {
          descr.push({
            id: _id,
            color: color
          });
          _this.setState({ descr: descr });
        }
      }
    }, _this._handleRemoveSerias = function (id) {
      if (_this.props.onRemoveSeries(id)) {
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
          _value = _this.refs.inputMfi.getValue(),
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
          { key: id, style: { paddingTop: '5px' } },
          _react2.default.createElement(_SvgMinus2.default, {
            onClick: _this._handleRemoveSerias.bind(null, id)
          }),
          _react2.default.createElement(
            'span',
            { style: { color: color, paddingLeft: '8px' } },
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
          { key: id, style: { paddingTop: '5px' } },
          _react2.default.createElement(_SvgMinus2.default, {
            onClick: _this._handleRemoveMfi.bind(null, id)
          }),
          _react2.default.createElement(
            'span',
            { style: { color: color, paddingLeft: '8px' } },
            id
          )
        );
      });
      return _react2.default.createElement(
        'div',
        null,
        _descr
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PanelIndicator, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          isMfi = _props.isMfi;


      var _mfiDom = isMfi ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { paddingTop: '5px' } },
          _react2.default.createElement(
            'span',
            { style: styles.captionSpan },
            'MFI'
          ),
          _react2.default.createElement(_InputText2.default, {
            ref: 'inputMfi',
            initValue: '14'
          }),
          _react2.default.createElement(_SvgPlus2.default, { onClick: this._handleAddMfi })
        ),
        this._renderMfi()
      ) : null;

      return _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isShow, style: styles.rootDiv },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { style: styles.captionSpan },
            'SMA'
          ),
          _react2.default.createElement(_InputText2.default, {
            ref: 'inputSMA',
            initValue: '50'
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

exports.default = PanelIndicator;
//# sourceMappingURL=PanelIndicator.js.map