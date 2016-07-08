'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    width: '16px',
    height: '16px',
    display: 'inline-block',
    cursor: 'pointer'
  },
  rootSvg: {
    display: 'inline-block'
  }
};

var SvgCheckBox = _react2.default.createClass({
  displayName: 'SvgCheckBox',
  getInitialState: function getInitialState() {
    var isOnCheck = typeof this.props.onCheck === 'function' ? true : false,
        isOnUnCheck = typeof this.props.onUnCheck === 'function' ? true : false;

    this.chartType = this.props.chartType ? this.props.chartType : 'Uknown';
    return {
      isChecked: false,
      isOnCheck: isOnCheck,
      isOnUnCheck: isOnUnCheck
    };
  },
  _handlerClick: function _handlerClick() {
    var _state = this.state;
    var isChecked = _state.isChecked;
    var isOnCheck = _state.isOnCheck;
    var isOnUnCheck = _state.isOnUnCheck;


    if (!isChecked && isOnCheck) {
      this.props.onCheck(this);
    } else if (isOnUnCheck) {
      this.props.onUnCheck(this);
    }

    this.setState({ isChecked: !isChecked });
  },
  render: function render() {
    var rootStyle = this.props.rootStyle;


    var pathChecked = void 0;
    if (this.state.isChecked) {
      pathChecked = _react2.default.createElement('path', {
        d: 'M 2,3 L 8,14 14,3',
        strokeWidth: '2',
        stroke: 'yellow',
        fill: '#4D4D4D'
      });
    }
    return _react2.default.createElement(
      'div',
      {
        style: Object.assign({}, styles.rootDiv, rootStyle),
        onClick: this._handlerClick
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
        pathChecked
      )
    );
  },
  setUnchecked: function setUnchecked() {
    this.setState({ isChecked: false });
  }
});

exports.default = SvgCheckBox;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\SvgCheckBox.js.map