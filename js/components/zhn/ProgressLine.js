'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transitions = {
  WIDTH: 'width 500ms ease-out',
  OPACITY: 'opacity 400ms linear'
};

var ProgressLine = (_temp = _class = function (_Component) {
  _inherits(ProgressLine, _Component);

  function ProgressLine(props) {
    _classCallCheck(this, ProgressLine);

    var _this = _possibleConstructorReturn(this, (ProgressLine.__proto__ || Object.getPrototypeOf(ProgressLine)).call(this));

    _this.wasCompleted = false;
    _this.idCompleted = null;
    _this.wasOpacied = false;
    _this.idOpacied = null;
    //this.state = {}
    return _this;
  }

  _createClass(ProgressLine, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.idCompleted) {
        clearTimeout(this.idCompleted);
      }
      if (this.idOpacied) {
        clearTimeout(this.idOpacied);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.wasCompleted) {
        this.idCompleted = setTimeout(function () {
          _this2.idCompleted = null;
          _this2.forceUpdate();
        }, 800);
      } else if (this.wasOpacied) {
        this.idOpacied = setTimeout(function () {
          _this2.idOpacied = null;
          _this2.forceUpdate();
        }, 800);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          color = _props.color,
          height = _props.height;

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
  }]);

  return ProgressLine;
}(_react.Component), _class.defaultProps = {
  color: '#2F7ED8',
  height: 3
}, _temp);
exports.default = ProgressLine;
//# sourceMappingURL=ProgressLine.js.map