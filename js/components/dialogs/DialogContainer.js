'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalDialogContainer = require('../zhn/ModalDialogContainer');

var _ModalDialogContainer2 = _interopRequireDefault(_ModalDialogContainer);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _RouterModalDialog = require('./RouterModalDialog');

var _RouterModalDialog2 = _interopRequireDefault(_RouterModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _hmDialogs = _RouterModalDialog2.default;

var DialogContainer = function (_Component) {
  _inherits(DialogContainer, _Component);

  function DialogContainer(props) {
    _classCallCheck(this, DialogContainer);

    var _this = _possibleConstructorReturn(this, (DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call(this));

    _this.state = {
      isShow: false,
      inits: {},
      shows: {},
      data: {},
      dialogs: [],
      currentDialog: null
    };

    _this._onStore = function (actionType, option) {
      if (actionType === _ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG) {
        var type = option.modalDialogType,
            _this$state = _this.state,
            inits = _this$state.inits,
            shows = _this$state.shows,
            data = _this$state.data,
            dialogs = _this$state.dialogs;


        data[type] = option;
        shows[type] = true;
        if (inits[type]) {
          _this.setState({ isShow: true, currentDialog: type, shows: shows, data: data });
        } else {
          dialogs.push({ type: type, comp: _hmDialogs[type] });
          inits[type] = true;
          _this.setState({ isShow: true, currentDialog: type, shows: shows, data: data, dialogs: dialogs });
        }
      }
    };

    _this._handleClose = function (type) {
      _this.state.shows[type] = false;
      _this.setState({ isShow: false, currentDialog: null, shows: _this.state.shows });
    };

    _this._renderDialogs = function () {
      var store = _this.props.store,
          _this$state2 = _this.state,
          shows = _this$state2.shows,
          data = _this$state2.data;


      return _this.state.dialogs.map(function (dialog, index) {
        var type = dialog.type,
            comp = dialog.comp;

        return _react2.default.createElement(comp, {
          key: type,
          isShow: shows[type],
          data: data[type],
          store: store,
          onClose: _this._handleClose.bind(null, type) });
      });
    };

    return _this;
  }

  _createClass(DialogContainer, [{
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

DialogContainer.displayName = 'DialogContainer';

exports.default = DialogContainer;
//# sourceMappingURL=DialogContainer.js.map