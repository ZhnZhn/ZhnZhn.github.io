'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Transitions = {
  WIDTH: 'width 500ms ease-out',
  OPACITY: 'opacity 400ms linear'
};

var ProgressLine = _react2.default.createClass({
  displayName: 'ProgressLine',
  getDefaultProps: function getDefaultProps() {
    return {
      color: '#2F7ED8',
      height: 3
    };
  },
  getInitialState: function getInitialState() {
    this.wasCompleted = false;
    this.idCompleted = null;
    this.wasOpacied = false;
    this.idOpacied = null;
    return {};
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.idCompleted) {
      clearTimeout(this.idCompleted);
    }
    if (this.idOpacied) {
      clearTimeout(this.idOpacied);
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    var _this = this;

    if (this.wasCompleted) {
      this.idCompleted = setTimeout(function () {
        _this.idCompleted = null;
        _this.forceUpdate();
      }, 800);
    } else if (this.wasOpacied) {
      this.idOpacied = setTimeout(function () {
        _this.idOpacied = null;
        _this.forceUpdate();
      }, 800);
    }
  },
  render: function render() {
    var _props = this.props;
    var color = _props.color;
    var height = _props.height;

    var _style = void 0;

    if (this.wasOpacied) {
      _style = {
        backgroundColor: color,
        width: 0,
        opacity: 1,
        height: height
      };
      this.wasOpacied = false;
    } else if (this.wasCompleted) {
      _style = {
        backgroundColor: color,
        width: '100%',
        opacity: 0,
        transition: Transitions.OPACITY,
        height: height
      };
      this.wasCompleted = false;
      this.wasOpacied = true;
    } else {
      var completed = this.props.completed;

      if (completed < 0) {
        completed = 0;
      } else if (completed >= 100) {
        completed = 100;
        this.wasCompleted = true;
      }

      _style = {
        backgroundColor: color,
        opacity: 1,
        width: completed + '%',
        transition: Transitions.WIDTH,
        height: height
      };
    }

    return _react2.default.createElement('div', { className: 'progress-line', style: _style });
  }
});

exports.default = ProgressLine;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ProgressLine.js.map