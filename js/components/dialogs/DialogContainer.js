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
    }, _this._setTypeTo = function (prevState, type, option) {
      prevState.shows[type] = true;
      prevState.data[type] = option;
      prevState.isShow = true;
      prevState.currentDialog = type;
      return prevState;
    }, _this._onStore = function (actionType, option) {
      if (actionType === _ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG) {
        var type = option.modalDialogType,
            inits = _this.state.inits;


        if (inits[type]) {
          _this.setState(function (prevState) {
            return _this._setTypeTo(prevState, type, option);
          });
        } else {
          _RouterModalDialog2.default.getDialog(type).then(function (comp) {
            return _this.setState(function (prevState) {
              prevState.dialogs.push({ type: type, comp: comp });
              prevState.inits[type] = true;
              return _this._setTypeTo(prevState, type, option);
            });
          });
        }
      }
    }, _this._handleClose = function (type) {
      _this.setState(function (prevState) {
        prevState.shows[type] = false;
        prevState.isShow = false;
        prevState.currentDialog = null;
        return prevState;
      });
    }, _this._renderDialogs = function () {
      var store = _this.props.store,
          _this$state = _this.state,
          shows = _this$state.shows,
          data = _this$state.data,
          dialogs = _this$state.dialogs;


      return dialogs.map(function (dialog) {
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
  /*
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func
    })
  }
  */

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
//import PropTypes from "prop-types";

exports.default = DialogContainer;
//# sourceMappingURL=DialogContainer.js.map