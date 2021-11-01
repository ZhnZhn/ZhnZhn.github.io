"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

var _dec, _dec2, _class;

const {
  Decor,
  crMenuMore
} = _DialogCell.default;
const S_DIALOG = {
  width: 300
},
      S_ROW_TEXT = {
  paddingRight: 16
};
let AlphaIndicatorDialog = (_dec = Decor.withToolbar, _dec2 = Decor.withLoad, _dec(_class = _dec2(_class = class AlphaIndicatorDialog extends _react.Component {
  constructor(props) {
    super(props);

    this._handleLoad = () => {
      const {
        loadId,
        dfSubId,
        onLoad
      } = this.props;
      const option = {
        loadId,
        dfSubId,
        indicator: 'SECTOR'
      };
      onLoad(option);
    };

    this._handleClose = () => {
      this.props.onClose();
    };

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    });
    this.toolbarButtons = this._createType2WithToolbar(props, {
      noDate: true,
      noLabels: true
    });
    this._commandButtons = this._crCommandsWithLoad(this);
    this.state = {
      isToolbar: true
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  }

  render() {
    const {
      isShow,
      caption,
      onShow,
      onFront
    } = this.props,
          {
      isToolbar
    } = this.state;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
      isShow: isShow,
      style: S_DIALOG,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
        isShow: isToolbar,
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Row.Text, {
        styleRoot: S_ROW_TEXT,
        caption: "AV:",
        text: "Sector Performances"
      })]
    });
  }

}) || _class) || _class);
var _default = AlphaIndicatorDialog;
exports.default = _default;
//# sourceMappingURL=AlphaSectorDialog.js.map