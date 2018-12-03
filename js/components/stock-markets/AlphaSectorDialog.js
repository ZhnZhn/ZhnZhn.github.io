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

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROW_TEXT: {
    paddingRight: '16px'
  }
};

var AlphaIndicatorDialog = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withLoad, _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3.default)(AlphaIndicatorDialog, _Component);

  function AlphaIndicatorDialog(props) {
    (0, _classCallCheck3.default)(this, AlphaIndicatorDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AlphaIndicatorDialog.__proto__ || Object.getPrototypeOf(AlphaIndicatorDialog)).call(this));

    _this._handleLoad = function () {
      var _this$props = _this.props,
          loadId = _this$props.loadId,
          onLoad = _this$props.onLoad;

      var option = {
        loadId: loadId,
        indicator: 'SECTOR'
        //value: _value, //for label
      };
      onLoad(option);
    };

    _this._handleClose = function () {
      _this.props.onClose();
    };

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: true, noLabels: true });
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = {
      isToolbar: true
    };
    return _this;
  }

  (0, _createClass3.default)(AlphaIndicatorDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps) {
        if (this.props.isShow === nextProps.isShow) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          caption = _props.caption,
          onShow = _props.onShow,
          onFront = _props.onFront,
          isToolbar = this.state.isToolbar;


      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          isShow: isShow,
          caption: caption,
          menuModel: this._menuMore,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.Toolbar, {
          isShow: isToolbar,
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_DialogCell2.default.Row.Text, {
          styleRoot: S.ROW_TEXT,
          caption: 'Alpha:',
          text: 'Performance by Sector'
        })
      );
    }
  }]);
  return AlphaIndicatorDialog;
}(_react.Component)) || _class) || _class);
exports.default = AlphaIndicatorDialog;
//# sourceMappingURL=AlphaSectorDialog.js.map