'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Adapter = require('../../adapters/alpha/Adapter');

var _Adapter2 = _interopRequireDefault(_Adapter);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  ERR_DESCR: 'API key from Alpha Vantage is required',
  ERR_CAPTION: "Without API Key"
};

var AlphaIntradayDialog = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withInitialState, _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3.default)(AlphaIntradayDialog, _Component);

  function AlphaIntradayDialog(props) {
    (0, _classCallCheck3.default)(this, AlphaIntradayDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AlphaIntradayDialog.__proto__ || Object.getPrototypeOf(AlphaIntradayDialog)).call(this, props));

    _this._crUrlOptions = function () {
      var _this$props = _this.props,
          getKey = _this$props.getKey,
          loadId = _this$props.loadId,
          onError = _this$props.onError;

      var apiKey = getKey(loadId);
      if (!apiKey) {
        onError(C.ERR_DESCR, C.ERR_CAPTION);
        return void 0;
      }
      return { apiKey: apiKey };
    };

    _this._handleClose = function () {
      _this.props.onClose();
    };

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: true });

    _this._searchApi = (0, _extends3.default)({}, _Adapter2.default.Search, {
      crUrlOptions: _this._crUrlOptions,
      onError: _this.props.onError
    });

    _this.state = (0, _extends3.default)({}, _this._isWithInitialState());
    return _this;
  }

  (0, _createClass3.default)(AlphaIntradayDialog, [{
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
          onFront = _props.onFront,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels;


      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          isShow: isShow,
          caption: caption,
          menuModel: this._menuMore,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.Toolbar, {
          isShow: isToolbar,
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_DialogCell2.default.RowInputSearch, {
          isShowLabels: isShowLabels,
          caption: 'Token',
          searchApi: this._searchApi
        })
      );
    }
  }]);
  return AlphaIntradayDialog;
}(_react.Component)) || _class) || _class);
exports.default = AlphaIntradayDialog;
//# sourceMappingURL=AlphaSearchDialog.js.map