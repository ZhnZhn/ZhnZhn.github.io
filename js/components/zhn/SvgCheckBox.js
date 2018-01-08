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

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  rootSvg: {
    display: 'inline-block'
  }
};

var SvgCheckBox = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(SvgCheckBox, _Component);

  function SvgCheckBox(props) {
    (0, _classCallCheck3.default)(this, SvgCheckBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SvgCheckBox.__proto__ || Object.getPrototypeOf(SvgCheckBox)).call(this));

    _initialiseProps.call(_this);

    var chartType = props.chartType,
        value = props.value,
        onCheck = props.onCheck,
        onUnCheck = props.onUnCheck,
        isOnCheck = typeof onCheck === 'function' ? true : false,
        isOnUnCheck = typeof onUnCheck === 'function' ? true : false;


    _this.chartType = chartType ? chartType : 'Unknown';

    _this.state = {
      //isChecked: false,
      isChecked: !!value,
      isOnCheck: isOnCheck,
      isOnUnCheck: isOnUnCheck
    };
    return _this;
  }

  (0, _createClass3.default)(SvgCheckBox, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps && typeof nextProps.value !== 'undefined') {
        this.setState({ isChecked: !!nextProps.value });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var rootStyle = this.props.rootStyle,
          pathCheckedEl = this.state.isChecked ? _react2.default.createElement('path', {
        d: 'M 2,3 L 8,14 14,3',
        strokeWidth: '2',
        stroke: 'yellow',
        fill: '#4D4D4D'
      }) : null;


      return _react2.default.createElement(
        'div',
        {
          style: Object.assign({}, styles.rootDiv, rootStyle),
          onClick: this._handleClick
        },
        _react2.default.createElement(
          'svg',
          { viewBox: '0 0 16 16', width: '100%', height: '100%',
            preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
            style: styles.rootSvg
          },
          _react2.default.createElement('rect', {
            x: '1', y: '1',
            height: '14', width: '14',
            strokeWidth: '2', stroke: '#777777',
            fill: '#4D4D4D', rx: '3'
          }),
          pathCheckedEl
        )
      );
    }
  }]);
  return SvgCheckBox;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleClick = function () {
    var _state = _this2.state,
        isChecked = _state.isChecked,
        isOnCheck = _state.isOnCheck,
        isOnUnCheck = _state.isOnUnCheck;

    if (!isChecked && isOnCheck) {
      _this2.props.onCheck(_this2);
    } else if (isOnUnCheck) {
      _this2.props.onUnCheck(_this2);
    }
    _this2.setState({ isChecked: !isChecked });
  };

  this.setUnchecked = function () {
    _this2.setState({ isChecked: false });
  };
}, _temp);
SvgCheckBox.propTypes = process.env.NODE_ENV !== "production" ? {
  value: _propTypes2.default.bool,
  chartType: _propTypes2.default.string,
  onCheck: _propTypes2.default.func,
  onUnCheck: _propTypes2.default.func
} : {};
exports.default = SvgCheckBox;
//# sourceMappingURL=SvgCheckBox.js.map