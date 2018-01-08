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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ModalPopup = require('../zhn-moleculs/ModalPopup');

var _ModalPopup2 = _interopRequireDefault(_ModalPopup);

var _InputText = require('../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _SvgPlus = require('../zhn/SvgPlus');

var _SvgPlus2 = _interopRequireDefault(_SvgPlus);

var _SvgMinus = require('../zhn/SvgMinus');

var _SvgMinus2 = _interopRequireDefault(_SvgMinus);

var _ModalMenu = require('./ModalMenu.Style');

var _ModalMenu2 = _interopRequireDefault(_ModalMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INIT_SMA = "50",
    INIT_MFI = "14";

var STYLE = {
  PANE: {
    width: '240px',
    margin: '8px'
  },
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    fontWeight: 'bold',
    width: '48px'
  },
  MOM_ATH: {
    display: 'inline-block',
    color: 'black',
    fontWeight: 'bold',
    paddingRight: '6px'
  },
  ROW: {
    paddingTop: '5px'
  },
  fnSpan: function fnSpan(color) {
    return { color: color, paddingLeft: '8px' };
  },
  SMA_PLUS: {
    marginLeft: '16px',
    color: 'black'
  }
};

var ModalMenuIndicator = function (_Component) {
  (0, _inherits3.default)(ModalMenuIndicator, _Component);

  function ModalMenuIndicator(props) {
    (0, _classCallCheck3.default)(this, ModalMenuIndicator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModalMenuIndicator.__proto__ || Object.getPrototypeOf(ModalMenuIndicator)).call(this));

    _this._checkIfAlreadyAdded = function (arrObj, id) {
      var result = arrObj.find(function (obj) {
        return obj.id === id;
      });
      if (result === undefined) {
        return false;
      } else {
        return true;
      }
    };

    _this._handleAddSma = function (ev, isPlus) {
      var period = isPlus ? _this.inputSmaPlus.getValue() : _this.inputSmaComp.getValue(),
          plus = isPlus ? _this.inputPlusSma.getValue() : undefined,
          descr = _this.state.descr,
          id = isPlus ? 'SMA+(' + period + ') +(' + plus + ')' : 'SMA(' + period + ')';


      if (!_this._checkIfAlreadyAdded(descr, id)) {
        var color = _this.props.onAddSma({ id: id, period: period, isPlus: isPlus, plus: plus });
        if (color) {
          _this.setState(function (prevState) {
            prevState.descr.push({ id: id, color: color });
            if (isPlus) {
              prevState.plusSma = plus;
            }
            return prevState;
          });
        }
      }
    };

    _this._handleRemoveSma = function (id) {
      if (_this.props.onRemoveSma(id)) {
        _this.state.descr = _this.state.descr.filter(function (descr) {
          return descr.id !== id;
        });
        _this.setState({ descr: _this.state.descr });
      }
    };

    _this._handleRemoveMfi = function (id) {
      _this.props.onRemoveMfi(id);
      _this.state.mfiDescrs = _this.state.mfiDescrs.filter(function (descr) {
        return descr.id !== id;
      });
      _this.setState({ mfiDescrs: _this.state.mfiDescrs });
    };

    _this._handleAddMfi = function () {
      var mfiDescrs = _this.state.mfiDescrs,
          _value = _this.inputMfiComp.getValue(),
          _id = 'MFI(' + _value + ')';


      if (!_this._checkIfAlreadyAdded(mfiDescrs, _id)) {
        _this.props.onAddMfi(_value, _id);
        mfiDescrs.push({
          id: _id,
          color: '#90ed7d'
        });
        _this.setState({ mfiDescrs: mfiDescrs });
      }
    };

    _this._handleAddMomAth = function () {
      _this.props.onAddMomAth();
    };

    _this._renderIndicators = function () {
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
    };

    _this._renderMfi = function () {
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
    };

    var isMomAth = props.isMomAth;

    _this._divMomAth = isMomAth ? _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { style: STYLE.MOM_ATH },
        'MOM(1) & ATH'
      ),
      _react2.default.createElement(_SvgPlus2.default, { onClick: _this._handleAddMomAth.bind(_this) })
    ) : null;

    _this.state = {
      plusSma: 5,
      descr: [],
      mfiDescrs: []
    };
    return _this;
  }

  (0, _createClass3.default)(ModalMenuIndicator, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isShow = _props.isShow,
          isMfi = _props.isMfi,
          onClose = _props.onClose,
          plusSma = this.state.plusSma;


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
        _ModalPopup2.default,
        {
          style: _ModalMenu2.default.ROOT,
          isShow: isShow,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: STYLE.PANE },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              { style: STYLE.CAPTION },
              'SMA+'
            ),
            _react2.default.createElement(_InputText2.default, {
              ref: function ref(c) {
                return _this2.inputSmaPlus = c;
              },
              initValue: INIT_SMA
            }),
            _react2.default.createElement(_SvgPlus2.default, { onClick: this._handleAddSma.bind(null, true) }),
            _react2.default.createElement(
              'span',
              { style: STYLE.SMA_PLUS },
              '+'
            ),
            _react2.default.createElement(_InputText2.default, {
              ref: function ref(c) {
                return _this2.inputPlusSma = c;
              },
              initValue: plusSma
            })
          ),
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
          _mfiDom,
          this._divMomAth
        )
      );
    }
  }]);
  return ModalMenuIndicator;
}(_react.Component);

ModalMenuIndicator.propTypes = process.env.NODE_ENV !== "production" ? {
  rootStyle: _propTypes2.default.object,
  isMfi: _propTypes2.default.bool,
  onAddSma: _propTypes2.default.func,
  onRemoveSma: _propTypes2.default.func,
  onAddMfi: _propTypes2.default.func,
  onRemoveMfi: _propTypes2.default.func,
  isMomAth: _propTypes2.default.bool,
  onAddMomAth: _propTypes2.default.func
} : {};
exports.default = ModalMenuIndicator;
//# sourceMappingURL=ModalMenuIndicator.js.map