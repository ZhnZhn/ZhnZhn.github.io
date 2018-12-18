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

var _class, _temp;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _utils = require('../zhn-utils/utils');

var _ModalSlider = require('../zhn-modal-slider/ModalSlider');

var _ModalSlider2 = _interopRequireDefault(_ModalSlider);

var _SvgMore = require('../zhn/SvgMore');

var _SvgMore2 = _interopRequireDefault(_SvgMore);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Interact = require('../../utils/Interact');

var _Interact2 = _interopRequireDefault(_Interact);

var _Dialog = require('./Dialog.Style');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'DRAGGABLE_DIALOG';

var CL = {
  ROOT: "draggable-dialog",
  SHOWING: 'show-popup',
  NOT_SELECTED: 'not-selected',
  MENU_MORE: 'popup-menu dialog__menu-more'
};

var S = (0, _extends3.default)({}, _Dialog2.default, {
  ROOT_DIV_DRAG: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    zIndex: 10
  },
  BT_MORE: {
    position: 'absolute',
    left: 0
  },
  BT_MORE_SVG: {
    stroke: 'inherit',
    fill: 'inherit'
  },
  CHILDREN_DIV: {
    cursor: 'default'
  }
});

var DraggableDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(DraggableDialog, _Component);

  function DraggableDialog(props) {
    (0, _classCallCheck3.default)(this, DraggableDialog);

    //this.rootDiv = null
    var _this = (0, _possibleConstructorReturn3.default)(this, (DraggableDialog.__proto__ || Object.getPrototypeOf(DraggableDialog)).call(this, props));

    _this._toggleMore = function () {
      _this.setState(function (prevState) {
        return {
          isMore: !prevState.isMore
        };
      });
    };

    _this._renderMenuMore = function (menuModel, isMore, TS) {
      return menuModel && _react2.default.createElement(_ModalSlider2.default, {
        isShow: isMore,
        className: CL.MENU_MORE,
        style: TS.EL_BORDER,
        model: menuModel,
        onClose: _this._toggleMore
      });
    };

    _this._renderBtMore = function (menuModel) {
      return menuModel && _react2.default.createElement(_SvgMore2.default, {
        btRef: _this._refBtMore,
        style: S.BT_MORE,
        svgStyle: S.BT_MORE_SVG,
        onClick: _this._toggleMore
      });
    };

    _this._renderCommandButton = function (commandButtons, onShowChart, onClose) {
      return _react2.default.createElement(
        'div',
        { style: S.COMMAND_DIV },
        commandButtons,
        typeof onShowChart === 'function' && _react2.default.createElement(_FlatButton2.default, {
          key: 'show',
          rootStyle: S.BT_ROOT,
          caption: 'Show',
          title: 'Show Pane Container'
          //accessKey="s"
          , onClick: onShowChart
        }),
        _react2.default.createElement(_FlatButton2.default, {
          key: 'close',
          rootStyle: S.BT_ROOT,
          caption: 'Close',
          title: 'Close Draggable Dialog'
          //accessKey="c"
          , onClick: onClose
        })
      );
    };

    _this._refRootDiv = _this._refRootDiv.bind(_this);
    //this.btMore = null
    _this._refBtMore = _this._refBtMore.bind(_this);

    _this._hKeyDown = _this._hKeyDown.bind(_this);
    _this._hClose = _this._hClose.bind(_this);

    _this.state = {
      isMore: false
    };
    return _this;
  }
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    commandButtons: PropTypes.arrayOf(PropTypes.element),
    onShowChart: PropTypes.func,
    onClose: PropTypes.func
  }
  */


  (0, _createClass3.default)(DraggableDialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _Interact2.default.makeDragable(this.rootDiv);
      this.focus();
    }
  }, {
    key: '_hasShowed',
    value: function _hasShowed(prevProps) {
      return !prevProps.isShow && this.props.isShow;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this._hasShowed(prevProps)) {
        this.focus();
      }
    }
  }, {
    key: '_hKeyDown',
    value: function _hKeyDown(evt) {
      if ((0, _utils.isKeyEscape)(evt)) {
        evt.preventDefault();
        evt.stopPropagation();
        this._hClose();
      }
    }
  }, {
    key: '_hClose',
    value: function _hClose() {
      this.props.onClose();
      this.focusPrev();
    }
  }, {
    key: '_refBtMore',
    value: function _refBtMore(node) {
      this.btMore = node;
    }
  }, {
    key: '_refRootDiv',
    value: function _refRootDiv(node) {
      this.rootDiv = node;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          menuModel = _props.menuModel,
          isShow = _props.isShow,
          caption = _props.caption,
          children = _props.children,
          commandButtons = _props.commandButtons,
          onShowChart = _props.onShowChart,
          onFront = _props.onFront,
          TS = theme.getStyle(TH_ID),
          isMore = this.state.isMore,
          _styleShow = isShow ? S.SHOW : S.HIDE,
          _classShow = isShow ? CL.SHOWING : '',
          _className = CL.ROOT + ' ' + _classShow;

      return (
        /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
        _react2.default.createElement(
          'div',
          {
            ref: this._refRootDiv,
            role: 'dialog',
            tabIndex: '-1',
            'aria-label': caption,
            'aria-hidden': !isShow,
            className: _className,
            style: (0, _extends3.default)({}, S.ROOT_DIV, S.ROOT_DIV_DRAG, _styleShow, TS.ROOT, TS.EL_BORDER),
            onClick: onFront,
            onKeyDown: this._hKeyDown
          },
          _react2.default.createElement(
            'div',
            { style: (0, _extends3.default)({}, S.CAPTION_DIV, TS.EL) },
            this._renderMenuMore(menuModel, isMore, TS),
            this._renderBtMore(menuModel),
            _react2.default.createElement(
              'span',
              { className: CL.NOT_SELECTED },
              caption
            ),
            _react2.default.createElement(_SvgClose2.default, {
              style: S.SVG_CLOSE,
              onClose: this._hClose
            })
          ),
          _react2.default.createElement(
            'div',
            { style: S.CHILDREN_DIV },
            children
          ),
          this._renderCommandButton(commandButtons, onShowChart, this._hClose)
        )
      );
    }
  }, {
    key: 'focus',
    value: function focus() {
      this._prevFocused = document.activeElement;
      (0, _utils.focusNode)(this.btMore || this.rootDiv);
    }
  }, {
    key: 'focusPrev',
    value: function focusPrev() {
      (0, _utils.focusNode)(this._prevFocused);
      this._prevFocused = null;
    }
  }]);
  return DraggableDialog;
}(_react.Component), _class.defaultProps = {
  onClose: function onClose() {}
}, _temp);
exports.default = (0, _withTheme2.default)(DraggableDialog);
//# sourceMappingURL=DraggableDialog.js.map