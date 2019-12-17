"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _Decorators = _interopRequireDefault(require("../dialogs/decorators/Decorators"));

var _MenuMore = _interopRequireDefault(require("../dialogs/MenuMore"));

var _dec, _dec2, _class, _temp;

var S = {
  ROW_TEXT: {
    paddingRight: '16px'
  }
};
var AlphaIndicatorDialog = (_dec = _Decorators["default"].withToolbar, _dec2 = _Decorators["default"].withLoad, _dec(_class = _dec2(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(AlphaIndicatorDialog, _Component);

  function AlphaIndicatorDialog(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._handleLoad = function () {
      var _this$props = _this.props,
          loadId = _this$props.loadId,
          onLoad = _this$props.onLoad;
      var option = {
        loadId: loadId,
        indicator: 'SECTOR' //value: _value, //for label

      };
      onLoad(option);
    };

    _this._handleClose = function () {
      _this.props.onClose();
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true,
      noLabels: true
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      isToolbar: true
    };
    return _this;
  }

  var _proto = AlphaIndicatorDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        caption = _this$props2.caption,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        isToolbar = this.state.isToolbar;
    return _react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose
    }, _react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), _react["default"].createElement(_DialogCell["default"].Row.Text, {
      styleRoot: S.ROW_TEXT,
      caption: "Alpha:",
      text: "Performance by Sector"
    }));
  };

  return AlphaIndicatorDialog;
}(_react.Component), _temp)) || _class) || _class);
var _default = AlphaIndicatorDialog;
exports["default"] = _default;
//# sourceMappingURL=AlphaSectorDialog.js.map