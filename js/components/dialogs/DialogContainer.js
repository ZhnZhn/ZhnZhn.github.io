'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalDialogContainer = require('../zhn/ModalDialogContainer');

var _ModalDialogContainer2 = _interopRequireDefault(_ModalDialogContainer);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _RouterModalDialog = require('./RouterModalDialog');

var _RouterModalDialog2 = _interopRequireDefault(_RouterModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _hmDialogs = _RouterModalDialog2.default;

var DialogContainer = _react2.default.createClass({
  displayName: 'DialogContainer',
  getInitialState: function getInitialState() {
    return {
      isShow: false,
      inits: {},
      shows: {},
      data: {},
      dialogs: [],
      currentDialog: null
    };
  },


  componentDidMount: function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(actionType, option) {
    if (actionType === _ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG) {
      var type = option.modalDialogType;
      var _state = this.state;
      var inits = _state.inits;
      var shows = _state.shows;
      var data = _state.data;
      var dialogs = _state.dialogs;


      data[type] = option;
      shows[type] = true;
      if (inits[type]) {
        this.setState({ isShow: true, currentDialog: type, shows: shows, data: data });
      } else {
        dialogs.push({ type: type, comp: _hmDialogs[type] });
        inits[type] = true;
        this.setState({ isShow: true, currentDialog: type, shows: shows, data: data, dialogs: dialogs });
      }
    }
  },
  _handlerClose: function _handlerClose(type) {
    this.state.shows[type] = false;
    this.setState({ isShow: false, currentDialog: null, shows: this.state.shows });
  },
  _renderDialogs: function _renderDialogs() {
    var _this = this;

    var store = this.props.store;
    var _state2 = this.state;
    var shows = _state2.shows;
    var data = _state2.data;


    return this.state.dialogs.map(function (dialog, index) {
      var type = dialog.type;
      var comp = dialog.comp;

      return _react2.default.createElement(comp, {
        key: type,
        isShow: shows[type],
        data: data[type],
        store: store,
        onClose: _this._handlerClose.bind(null, type) });
    });
  },
  render: function render() {
    var _state3 = this.state;
    var isShow = _state3.isShow;
    var currentDialog = _state3.currentDialog;


    return _react2.default.createElement(
      _ModalDialogContainer2.default,
      {
        isShow: isShow,
        onClose: this._handlerClose.bind(null, currentDialog)
      },
      this._renderDialogs()
    );
  }
});

exports.default = DialogContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogContainer.js.map