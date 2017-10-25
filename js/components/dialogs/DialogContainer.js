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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ModalDialogContainer = require('../zhn-containers/ModalDialogContainer');

var _ModalDialogContainer2 = _interopRequireDefault(_ModalDialogContainer);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _RouterModalDialog = require('./RouterModalDialog');

var _RouterModalDialog2 = _interopRequireDefault(_RouterModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogContainer = function (_Component) {
  (0, _inherits3.default)(DialogContainer, _Component);

  function DialogContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DialogContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isShow: false,
      inits: {},
      shows: {},
      data: {},
      dialogs: [],
      currentDialog: null
    }, _this._onStore = function (actionType, option) {
      if (actionType === _ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG) {
        (function () {
          var type = option.modalDialogType,
              _this$state = _this.state,
              inits = _this$state.inits,
              shows = _this$state.shows,
              data = _this$state.data,
              dialogs = _this$state.dialogs;


          data[type] = option;
          shows[type] = true;
          if (inits[type]) {
            _this.setState({
              isShow: true, currentDialog: type,
              shows: shows, data: data
            });
          } else {
            _RouterModalDialog2.default.getDialog(type).then(function (comp) {
              dialogs.push({ type: type, comp: comp });
              inits[type] = true;
              _this.setState({
                isShow: true, currentDialog: type,
                shows: shows, data: data, dialogs: dialogs
              });
            });
            /*
             dialogs.push({
               type : type,
               comp : RouterModalDialog[type]
             });
             inits[type] = true
             this.setState({
               isShow: true, currentDialog: type,
               shows, data, dialogs
             });
             */
          }
        })();
      }
    }, _this._handleClose = function (type) {
      _this.state.shows[type] = false;
      _this.setState({
        isShow: false,
        currentDialog: null,
        shows: _this.state.shows
      });
    }, _this._renderDialogs = function () {
      var store = _this.props.store,
          _this$state2 = _this.state,
          shows = _this$state2.shows,
          data = _this$state2.data,
          dialogs = _this$state2.dialogs;


      return dialogs.map(function (dialog, index) {
        var type = dialog.type,
            comp = dialog.comp;

        return _react2.default.createElement(comp, {
          key: type,
          isShow: shows[type],
          data: data[type],
          store: store,
          onClose: _this._handleClose.bind(null, type)
        });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DialogContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          isShow = _state.isShow,
          currentDialog = _state.currentDialog;


      return _react2.default.createElement(
        _ModalDialogContainer2.default,
        {
          isShow: isShow,
          onClose: this._handleClose.bind(null, currentDialog)
        },
        this._renderDialogs()
      );
    }
  }]);
  return DialogContainer;
}(_react.Component);

DialogContainer.propTypes = process.env.NODE_ENV !== "production" ? {
  store: _propTypes2.default.shape({
    listen: _propTypes2.default.func
  })
} : {};
exports.default = DialogContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogContainer.js.map