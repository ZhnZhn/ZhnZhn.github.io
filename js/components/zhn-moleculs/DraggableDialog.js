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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Interact = require('../../utils/Interact');

var _Interact2 = _interopRequireDefault(_Interact);

var _Dialog = require('./Dialog.Style');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  SHOWING: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

var S = (0, _extends3.default)({}, _Dialog2.default, {
  ROOT_DIV_DRAG: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    zIndex: 10
  },
  CHILDREN_DIV: {
    cursor: 'default'
  }
});

var DraggableDialog = function (_Component) {
  (0, _inherits3.default)(DraggableDialog, _Component);

  function DraggableDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DraggableDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DraggableDialog.__proto__ || Object.getPrototypeOf(DraggableDialog)).call.apply(_ref, [this].concat(args))), _this), _this._renderCommandButton = function (commandButtons, onShowChart, onClose) {
      return _react2.default.createElement(
        'div',
        { style: S.COMMAND_DIV },
        commandButtons,
        typeof onShowChart === 'function' && _react2.default.createElement(_FlatButton2.default, {
          rootStyle: S.BT_ROOT,
          caption: 'Show',
          title: 'Show Pane Container'
          //accessKey="s"
          , onClick: onShowChart
        }),
        _react2.default.createElement(_FlatButton2.default, {
          rootStyle: S.BT_ROOT,
          caption: 'Close',
          title: 'Close Draggable Dialog'
          //accessKey="c"
          , onClick: onClose
        })
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DraggableDialog, [{
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
          onFront = _props.onFront,
          onClose = _props.onClose,
          _styleShow = isShow ? S.SHOW : S.HIDE,
          _classShow = isShow ? CL.SHOWING : undefined;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(c) {
            return _this2.rootDivEl = c;
          },
          className: _classShow,
          style: (0, _extends3.default)({}, S.ROOT_DIV, S.ROOT_DIV_DRAG, _styleShow),
          onClick: onFront
        },
        _react2.default.createElement(
          'div',
          { style: S.CAPTION_DIV },
          _react2.default.createElement(
            'span',
            { className: CL.NOT_SELECTED },
            caption
          ),
          _react2.default.createElement(_SvgClose2.default, { onClose: onClose })
        ),
        _react2.default.createElement(
          'div',
          { style: S.CHILDREN_DIV },
          children
        ),
        this._renderCommandButton(commandButtons, onShowChart, onClose)
      );
    }
  }]);
  return DraggableDialog;
}(_react.Component);

process.env.NODE_ENV !== "production" ? DraggableDialog.propTypes = {
  isShow: _propTypes2.default.bool,
  caption: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  commandButtons: _propTypes2.default.arrayOf(_propTypes2.default.element),
  onShowChart: _propTypes2.default.func,
  onClose: _propTypes2.default.func
} : void 0;
exports.default = DraggableDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-moleculs\DraggableDialog.js.map