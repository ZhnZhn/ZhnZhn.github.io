'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var styles = {
  rootDiv: {
    zIndex: 1030,
    position: 'absolute',
    top: '70px',
    left: '10px',
    width: '99%'
  }
};

var getObjToFirst = function getObjToFirst(arr, keyValue) {
  var index = void 0;
  for (var i = 0, max = arr.length; i < max; i++) {
    if (arr[i].key === keyValue) {
      index = i;
      break;
    }
  }
  return [].concat(_toConsumableArray(arr.slice(0, index)), _toConsumableArray(arr.slice(index + 1)), [arr[index]]);
};

var DialogContainer3 = _react2.default.createClass({
  displayName: 'DialogContainer3',

  getInitialState: function getInitialState() {
    this._activeDialogs = [];
    return {
      dialog: {},
      compDialogs: []
    };
  },

  componentWillMount: function componentWillMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },

  _checkActiveDialogs: function _checkActiveDialogs(dialogType) {
    this._activeDialogs.push(dialogType);
    if (this._activeDialogs.length > this.props.maxDialog) {
      this.state.dialog[this._activeDialogs[0]] = false;
      this._activeDialogs = this._activeDialogs.slice(1);
    }
  },
  filterActiveDialogs: function filterActiveDialogs(dialogType) {
    this._activeDialogs = this._activeDialogs.filter(function (value) {
      return value !== dialogType;
    });
  },


  _onStore: function _onStore(actionType, data) {
    var _props = this.props;
    var initAction = _props.initAction;
    var showAction = _props.showAction;

    if (actionType === showAction) {

      if (!this.state.dialog[data]) {
        this.state.dialog[data] = true;
        this._checkActiveDialogs(data);
      }
      this.state.compDialogs = getObjToFirst(this.state.compDialogs, data);
      this.setState(this.state);
    } else if (actionType === initAction) {

      this.state.dialog[data.dialogType] = true;
      this.state.compDialogs.push(data.dialogComp);
      this._checkActiveDialogs(data.dialogType);
      this.setState(this.state);
    }
  },

  _handlerToggleDialog: function _handlerToggleDialog(dialogType) {
    var dialog = this.state.dialog;

    dialog[dialogType] = !dialog[dialogType];
    this.setState(this.state);

    if (!dialog[dialogType]) {
      this.filterActiveDialogs(dialogType);
      document.getElementsByTagName('html')[0].style.cursor = '';
    }
  },

  _renderDialogs: function _renderDialogs() {
    var _this = this;

    var _state = this.state;
    var dialog = _state.dialog;
    var compDialogs = _state.compDialogs;

    return compDialogs.map(function (compDialog, index) {
      return _react2.default.cloneElement(compDialog, {
        key: compDialog.key,
        isShow: dialog[compDialog.key],
        onClose: _this._handlerToggleDialog.bind(_this, compDialog.key)
      });
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { style: styles.rootDiv },
      this._renderDialogs()
    );
  }
});

exports.default = DialogContainer3;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\DialogContainer3.js.map