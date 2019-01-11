'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _initialiseProps;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartFn = require('../../charts/ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _seriaFn = require('../../math/seriaFn');

var _seriaFn2 = _interopRequireDefault(_seriaFn);

var _IndicatorBuilder = require('../../charts/IndicatorBuilder');

var _IndicatorBuilder2 = _interopRequireDefault(_IndicatorBuilder);

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

var growthRate = _seriaFn2.default.growthRate,
    normalize = _seriaFn2.default.normalize;
var removeSeriaFrom = _IndicatorBuilder2.default.removeSeriaFrom,
    addSmaTo = _IndicatorBuilder2.default.addSmaTo,
    crMfiConfig = _IndicatorBuilder2.default.crMfiConfig,
    crMomAthConfig = _IndicatorBuilder2.default.crMomAthConfig;


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

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
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
  return s && _isFn(s.setVisible);
};

var FNS = {
  GR: ['_grSeria', 'isGrowRate', C_GROW, growthRate],
  NORM: ['_normSeria', 'isNormalize', C_GROW, normalize]
};

var NORM_CAPTION_EL = _react2.default.createElement(
  _react.Fragment,
  null,
  'Normalize (100*y',
  _react2.default.createElement(
    'sub',
    null,
    't'
  ),
  '/y',
  _react2.default.createElement(
    'sub',
    null,
    '0'
  ),
  ')'
);

var RowMinusPlus = function RowMinusPlus(_ref) {
  var is = _ref.is,
      caption = _ref.caption,
      onMinus = _ref.onMinus,
      onPlus = _ref.onPlus;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'span',
      { style: STYLE.GR },
      caption
    ),
    is ? _react2.default.createElement(_SvgMinus2.default, { onClick: onMinus }) : _react2.default.createElement(_SvgPlus2.default, { onClick: onPlus })
  );
};

var ModalMenuIndicator = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ModalMenuIndicator, _Component);

  function ModalMenuIndicator(props) {
    (0, _classCallCheck3.default)(this, ModalMenuIndicator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModalMenuIndicator.__proto__ || Object.getPrototypeOf(ModalMenuIndicator)).call(this, props));

    _initialiseProps.call(_this);

    var config = props.config;

    _this._isMfi = !!config.zhIsMfi;
    _this._momAthEl = config.zhIsMomAth ? _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { style: STYLE.MOM_ATH },
        'MOM(1) & ATH'
      ),
      _react2.default.createElement(_SvgPlus2.default, { onClick: _this._handleAddMomAth.bind(_this) })
    ) : null;

    _this._addGrowRate = _this._addSeriaBy.bind(_this, FNS.GR);
    _this._removeGrowRate = _this._hideSeriaBy.bind(_this, FNS.GR);

    _this._addNormalize = _this._addSeriaBy.bind(_this, FNS.NORM);
    _this._removeNormalize = _this._hideSeriaBy.bind(_this, FNS.NORM);

    _this.state = {
      isGrowRate: false,
      isNormalize: false,
      plusSma: 5,
      descr: [],
      mfiDescrs: []
    };
    return _this;
  }
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    chartId: PropTypes.string,
    config: PropTypes.object,
    getChart: PropTypes.func,
    onAddMfi: PropTypes.func,
    onRemoveMfi: PropTypes.func,
  }
  */

  (0, _createClass3.default)(ModalMenuIndicator, [{
    key: '_addSeriaBy',
    value: function _addSeriaBy(arr) {
      var seriaPropName = arr[0],
          statePropName = arr[1],
          color = arr[2],
          fn = arr[3];

      var _seria = this[seriaPropName];
      if (!this._chart) {
        this._chart = this.props.getChart();
      }
      if (this._chart) {
        if (_isSeriaInst(_seria)) {
          _seria.setVisible(true);
        } else {
          var data = this._chart.series[0].data,
              seriaData = fn(data);
          this[seriaPropName] = _ChartFn2.default.addDataTo(this._chart, color, seriaData, false);
        }
        this.setState((0, _defineProperty3.default)({}, statePropName, true));
      }
    }
  }, {
    key: '_hideSeriaBy',
    value: function _hideSeriaBy(arr) {
      var seriaPropName = arr[0],
          statePropName = arr[1];
      var _seria = this[seriaPropName];
      if (_isSeriaInst(_seria)) {
        _seria.setVisible(false);
        this.setState((0, _defineProperty3.default)({}, statePropName, false));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          config = _props.config,
          onClose = _props.onClose,
          _config$zhConfig = config.zhConfig,
          zhConfig = _config$zhConfig === undefined ? {} : _config$zhConfig,
          isWithoutSma = zhConfig.isWithoutSma,
          _state = this.state,
          isGrowRate = _state.isGrowRate,
          isNormalize = _state.isNormalize,
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
          _react2.default.createElement(RowMinusPlus, {
            is: isGrowRate,
            caption: 'Growth Rate',
            onMinus: this._removeGrowRate,
            onPlus: this._addGrowRate
          }),
          _react2.default.createElement(RowMinusPlus, {
            is: isNormalize,
            caption: NORM_CAPTION_EL,
            onMinus: this._removeNormalize,
            onPlus: this._addNormalize
          }),
          !isWithoutSma && this._renderSma(plusSma),
          this._renderIndicators(),
          this._renderMfiPart(this._isMfi),
          this._momAthEl
        )
      );
    }
  }]);
  return ModalMenuIndicator;
}(_react.Component), _class.defaultProps = {
  getChart: function getChart() {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleAddSma = function (ev, isPlus) {
    var period = isPlus ? _this2.inputSmaPlus.getValue() : _this2.inputSmaComp.getValue(),
        plus = isPlus ? _this2.inputPlusSma.getValue() : undefined,
        descr = _this2.state.descr,
        id = isPlus ? 'SMA+(' + period + ') +(' + plus + ')' : 'SMA(' + period + ')';


    if (!_isInArrObjWithId(descr, id)) {
      var chart = _this2.props.getChart(),
          color = addSmaTo(chart, {
        id: id, period: period, isPlus: isPlus, plus: plus
      });
      if (color) {
        _this2.setState(function (prevState) {
          prevState.descr.push({ id: id, color: color });
          if (isPlus) {
            prevState.plusSma = plus;
          }
          return prevState;
        });
      }
    }
  };

  this._handleRemoveSma = function (id) {
    var chart = _this2.props.getChart();
    if (removeSeriaFrom(chart, id)) {
      _this2.setState(function (prevState) {
        return {
          descr: prevState.descr.filter(function (d) {
            return d.id !== id;
          })
        };
      });
    }
  };

  this._handleRemoveMfi = function (id) {
    _this2.props.onRemoveMfi(id);
    _this2.setState(function (prevState) {
      return {
        mfiDescrs: prevState.mfiDescrs.filter(function (d) {
          return d.id !== id;
        })
      };
    });
  };

  this._handleAddMfi = function () {
    var mfiDescrs = _this2.state.mfiDescrs,
        _value = _this2.inputMfiComp.getValue(),
        _id = 'MFI(' + _value + ')';


    if (!_isInArrObjWithId(mfiDescrs, _id)) {
      var chart = _this2.props.getChart(),
          config = crMfiConfig(chart, _value, _id);
      if (config) {
        _this2.props.onAddMfi(config, _id);
        mfiDescrs.push(_crMfiDescr(_id));
        _this2.setState({ mfiDescrs: mfiDescrs });
      }
    }
  };

  this._handleAddMomAth = function () {
    var chart = _this2.props.getChart(),
        config = crMomAthConfig(chart, _this2.props.chartId);
    if (config) {
      _this2.props.onAddMfi(config, 'MOM_ATH');
    }
  };

  this._renderSma = function (plusSma) {
    return _react2.default.createElement(
      _react.Fragment,
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          { style: STYLE.CAPTION },
          'SMA+'
        ),
        _react2.default.createElement(_InputText2.default, {
          ref: _this2._refSmaPlus,
          style: STYLE.N3,
          initValue: INIT_SMA,
          type: 'number'
        }),
        _react2.default.createElement(_SvgPlus2.default, { onClick: _this2._handleAddSma.bind(null, true) }),
        _react2.default.createElement(
          'span',
          { style: STYLE.SMA_PLUS },
          '+'
        ),
        _react2.default.createElement(_InputText2.default, {
          ref: _this2._refPlusSma,
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
          ref: _this2._refSmaComp,
          style: STYLE.N3,
          initValue: INIT_SMA,
          type: 'number'
        }),
        _react2.default.createElement(_SvgPlus2.default, { onClick: _this2._handleAddSma })
      )
    );
  };

  this._renderIndicators = function () {
    var _descr = _this2.state.descr.map(function (descr) {
      var id = descr.id,
          color = descr.color;

      return _react2.default.createElement(
        'div',
        { key: id, style: STYLE.ROW },
        _react2.default.createElement(_SvgMinus2.default, {
          onClick: _this2._handleRemoveSma.bind(null, id)
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

  this._renderMfi = function () {
    var _descr = _this2.state.mfiDescrs.map(function (descr) {
      var id = descr.id,
          color = descr.color;

      return _react2.default.createElement(
        'div',
        { key: id, style: STYLE.ROW },
        _react2.default.createElement(_SvgMinus2.default, {
          onClick: _this2._handleRemoveMfi.bind(null, id)
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

  this._renderMfiPart = function (isMfi) {
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
          ref: _this2._refMfiComp,
          style: STYLE.N2,
          initValue: INIT_MFI,
          type: 'number'
        }),
        _react2.default.createElement(_SvgPlus2.default, { onClick: _this2._handleAddMfi })
      ),
      _this2._renderMfi()
    ) : null;
  };

  this._refMfiComp = function (c) {
    return _this2.inputMfiComp = c;
  };

  this._refSmaPlus = function (c) {
    return _this2.inputSmaPlus = c;
  };

  this._refPlusSma = function (c) {
    return _this2.inputPlusSma = c;
  };

  this._refSmaComp = function (c) {
    return _this2.inputSmaComp = c;
  };
}, _temp);
exports.default = ModalMenuIndicator;
//# sourceMappingURL=ModalMenuIndicator.js.map