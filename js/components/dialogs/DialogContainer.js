'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hmDialogs2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalDialogContainer = require('../zhn/ModalDialogContainer');

var _ModalDialogContainer2 = _interopRequireDefault(_ModalDialogContainer);

var _InfoDialog = require('./InfoDialog');

var _InfoDialog2 = _interopRequireDefault(_InfoDialog);

var _AlertDialog = require('./AlertDialog');

var _AlertDialog2 = _interopRequireDefault(_AlertDialog);

var _DescriptionDialog = require('./DescriptionDialog');

var _DescriptionDialog2 = _interopRequireDefault(_DescriptionDialog);

var _SettingsDialog = require('../header/SettingsDialog');

var _SettingsDialog2 = _interopRequireDefault(_SettingsDialog);

var _AddToWatchDialog = require('../watch-browser/AddToWatchDialog');

var _AddToWatchDialog2 = _interopRequireDefault(_AddToWatchDialog);

var _LoadItemDialog = require('../watch-browser/LoadItemDialog');

var _LoadItemDialog2 = _interopRequireDefault(_LoadItemDialog);

var _EditGroupDialog = require('../watch-browser/EditGroupDialog');

var _EditGroupDialog2 = _interopRequireDefault(_EditGroupDialog);

var _EditListDialog = require('../watch-browser/EditListDialog');

var _EditListDialog2 = _interopRequireDefault(_EditListDialog);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _hmDialogs = (_hmDialogs2 = {}, _defineProperty(_hmDialogs2, _Type.ModalDialog.INFO, _InfoDialog2.default), _defineProperty(_hmDialogs2, _Type.ModalDialog.ALERT, _AlertDialog2.default), _defineProperty(_hmDialogs2, _Type.ModalDialog.DESCRIPTION, _DescriptionDialog2.default), _defineProperty(_hmDialogs2, _Type.ModalDialog.SETTINGS, _SettingsDialog2.default), _defineProperty(_hmDialogs2, _Type.ModalDialog.ADD_TO_WATCH, _AddToWatchDialog2.default), _defineProperty(_hmDialogs2, _Type.ModalDialog.LOAD_ITEM, _LoadItemDialog2.default), _defineProperty(_hmDialogs2, _Type.ModalDialog.EDIT_WATCH_GROUP, _EditGroupDialog2.default), _defineProperty(_hmDialogs2, _Type.ModalDialog.EDIT_WATCH_LIST, _EditListDialog2.default), _hmDialogs2);

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