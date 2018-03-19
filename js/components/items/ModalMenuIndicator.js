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

var _class, _temp;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartFn = require('../../charts/ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _seriaFn = require('../../math/seriaFn');

var _seriaFn2 = _interopRequireDefault(_seriaFn);

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

var growthRate = _seriaFn2.default.growthRate;


var INIT_SMA = "50",
    INIT_MFI = "14";

var C_GROW = '#90ed7d';

var STYLE = {
  PANE: {
    width: '220px',
    margin: '8px'
  },
  GR: {
    display: 'inline-block',
    color: 'black',
    fontWeight: 'bold',
    paddingRight: '8px',
    paddingBottom: '6px'
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
  },
  N2: {
    width: '48px'
  },
  N3: {
    width: '56px'
  }
};

var _isInArrObjWithId = function _isInArrObjWithId(arrObj, id) {
  return !!arrObj.find(function (obj) {
    return obj.id === id;
  });
};

var _crMfiDescr = function _crMfiDescr(id) {
  return {
    id: id,
    color: '#90ed7d'
  };
};

var _isSeriaInst = function _isSeriaInst(s) {
  return s && typeof s.setVisible == 'function';
};

var ModalMenuIndicator = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ModalMenuIndicator, _Component);

  function ModalMenuIndicator(props) {
    (0, _classCallCheck3.default)(this, ModalMenuIndicator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModalMenuIndicator.__proto__ || Object.getPrototypeOf(ModalMenuIndicator)).call(this));

    _this._addGrowRate = function () {
      var _grSeria = _this._grSeria;

      if (!_this._chart) {
        _this._chart = _this.props.getChart();
      }
      if (_this._chart) {
        if (_isSeriaInst(_grSeria)) {
          _grSeria.setVisible(true);
        } else {
          var data = _this._chart.series[0].data,
              grData = growthRate(data);
          _this._grSeria = _ChartFn2.default.addDataTo(_this._chart, C_GROW, grData, false);
        }
        _this.setState({ isGrowRate: true });
      }
    };

    _this._removeGrowRate = function () {
      var _grSeria = _this._grSeria;

      if (_isSeriaInst(_grSeria)) {
        _grSeria.setVisible(false);
        _this.setState({ isGrowRate: false });
      }
    };

    _this._handleAddSma = function (ev, isPlus) {
      var period = isPlus ? _this.inputSmaPlus.getValue() : _this.inputSmaComp.getValue(),
          plus = isPlus ? _this.inputPlusSma.getValue() : undefined,
          descr = _this.state.descr,
          id = isPlus ? 'SMA+(' + period + ') +(' + plus + ')' : 'SMA(' + period + ')';


      if (!_isInArrObjWithId(descr, id)) {
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
        _this.setState(function (prevState) {
          return {
            descr: prevState.descr.filter(function (d) {
              return d.id !== id;
            })
          };
        });
      }
    };

    _this._handleRemoveMfi = function (id) {
      _this.props.onRemoveMfi(id);
      _this.setState(function (prevState) {
        return {
          mfiDescrs: prevState.mfiDescrs.filter(function (d) {
            return d.id !== id;
          })
        };
      });
    };

    _this._handleAddMfi = function () {
      var mfiDescrs = _this.state.mfiDescrs,
          _value = _this.inputMfiComp.getValue(),
          _id = 'MFI(' + _value + ')';


      if (!_isInArrObjWithId(mfiDescrs, _id)) {
        _this.props.onAddMfi(_value, _id);
        mfiDescrs.push(_crMfiDescr(_id));
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

    _this._renderMfiPart = function (isMfi) {
      return isMfi ? _react2.default.createElement(
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
            ref: _this._refMfiComp,
            style: STYLE.N2,
            initValue: INIT_MFI,
            type: 'number'
          }),
          _react2.default.createElement(_SvgPlus2.default, { onClick: _this._handleAddMfi })
        ),
        _this._renderMfi()
      ) : null;
    };

    _this._renderGrowRate = function (isGrowRate) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          { style: STYLE.GR },
          'Grow Rate'
        ),
        isGrowRate ? _react2.default.createElement(_SvgMinus2.default, { onClick: _this._removeGrowRate }) : _react2.default.createElement(_SvgPlus2.default, { onClick: _this._addGrowRate })
      );
    };

    _this._refMfiComp = function (c) {
      return _this.inputMfiComp = c;
    };

    _this._refSmaPlus = function (c) {
      return _this.inputSmaPlus = c;
    };

    _this._refPlusSma = function (c) {
      return _this.inputPlusSma = c;
    };

    _this._refSmaComp = function (c) {
      return _this.inputSmaComp = c;
    };

    var isMomAth = props.isMomAth;

    _this._momAthEl = isMomAth ? _react2.default.createElement(
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
      isGrowRate: false,
      plusSma: 5,
      descr: [],
      mfiDescrs: []
    };
    return _this;
  }
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    isMfi: PropTypes.bool,
    getChart: PropTypes.func,
    onAddSma: PropTypes.func,
    onRemoveSma: PropTypes.func,
    onAddMfi: PropTypes.func,
    onRemoveMfi: PropTypes.func,
    isMomAth: PropTypes.bool,
    onAddMomAth: PropTypes.func,
  }
  */

  (0, _createClass3.default)(ModalMenuIndicator, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          isMfi = _props.isMfi,
          onClose = _props.onClose,
          _state = this.state,
          isGrowRate = _state.isGrowRate,
          plusSma = _state.plusSma;

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
          this._renderGrowRate(isGrowRate),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              { style: STYLE.CAPTION },
              'SMA+'
            ),
            _react2.default.createElement(_InputText2.default, {
              ref: this._refSmaPlus,
              style: STYLE.N3,
              initValue: INIT_SMA,
              type: 'number'
            }),
            _react2.default.createElement(_SvgPlus2.default, { onClick: this._handleAddSma.bind(null, true) }),
            _react2.default.createElement(
              'span',
              { style: STYLE.SMA_PLUS },
              '+'
            ),
            _react2.default.createElement(_InputText2.default, {
              ref: this._refPlusSma,
              initValue: plusSma,
              type: 'number'
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
              ref: this._refSmaComp,
              style: STYLE.N3,
              initValue: INIT_SMA,
              type: 'number'
            }),
            _react2.default.createElement(_SvgPlus2.default, { onClick: this._handleAddSma })
          ),
          this._renderIndicators(),
          this._renderMfiPart(isMfi),
          this._momAthEl
        )
      );
    }
  }]);
  return ModalMenuIndicator;
}(_react.Component), _class.defaultProps = {
  getChart: function getChart() {}
}, _temp);
exports.default = ModalMenuIndicator;
//# sourceMappingURL=ModalMenuIndicator.js.map