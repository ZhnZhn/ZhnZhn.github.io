'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgClose = require('./SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ToolBarButton = require('./ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _Interact = require('../utils/Interact');

var _Interact2 = _interopRequireDefault(_Interact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  rootDiv: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    backgroundColor: '#4D4D4D',
    border: 'solid 2px #232F3B',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 10
  },
  captionDiv: {
    padding: '5px',
    color: 'rgba(164, 135, 212,1)',
    backgroundColor: '#232F3B',
    textAlign: 'center',
    fontSize: '18px'
  },
  childrenDiv: {
    cursor: 'default'
  },
  commandDiv: {
    cursor: 'default',
    float: 'right',
    marginTop: '8px',
    marginBottom: '10px',
    marginRight: '4px'
  }
};

var ZhDialog = function (_Component) {
  _inherits(ZhDialog, _Component);

  function ZhDialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ZhDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ZhDialog.__proto__ || Object.getPrototypeOf(ZhDialog)).call.apply(_ref, [this].concat(args))), _this), _this._renderCommandButton = function (commandButtons, onShowChart, onClose) {
      return _react2.default.createElement(
        'div',
        { style: styles.commandDiv },
        commandButtons,
        _react2.default.createElement(_ToolBarButton2.default, {
          type: 'TypeC',
          caption: 'Show',
          onClick: onShowChart
        }),
        _react2.default.createElement(_ToolBarButton2.default, {
          type: 'TypeC',
          caption: 'Close',
          onClick: onClose
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ZhDialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _Interact2.default.makeDragable(this.rootDivEl);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isShow = _props.isShow,
          caption = _props.caption,
          children = _props.children,
          commandButtons = _props.commandButtons,
          onShowChart = _props.onShowChart,
          onClose = _props.onClose,
          _styleShow = isShow ? { display: 'block' } : { display: 'none' },
          _classShow = isShow ? 'show-popup' : undefined;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(c) {
            return _this2.rootDivEl = c;
          },
          className: _classShow,
          style: Object.assign({}, styles.rootDiv, _styleShow)
        },
        _react2.default.createElement(
          'div',
          { style: styles.captionDiv },
          _react2.default.createElement(
            'span',
            { className: 'not-selected' },
            caption
          ),
          _react2.default.createElement(_SvgClose2.default, { onClose: onClose })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.childrenDiv },
          children
        ),
        this._renderCommandButton(commandButtons, onShowChart, onClose)
      );
    }
  }]);

  return ZhDialog;
}(_react.Component);

exports.default = ZhDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ZhDialog.js.map