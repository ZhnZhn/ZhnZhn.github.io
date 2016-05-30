'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _fnShowAlertDialog = function _fnShowAlertDialog(caption, descr) {
  var modalDialogType = _Type.ModalDialog.ALERT;
  _ComponentActions2.default.showModalDialog(_Type.ModalDialog.ALERT, { caption: caption, descr: descr, modalDialogType: modalDialogType });
};

var WithLoadOptions = {
  _loadOptions: function _loadOptions(_ref) {
    var _this = this;

    var toStateProp = _ref.toStateProp;
    var uri = _ref.uri;
    var fnOnCompleted = _ref.fnOnCompleted;
    var fnOnFailed = _ref.fnOnFailed;
    var _ref$retryServer = _ref.retryServer;
    var retryServer = _ref$retryServer === undefined ? 3 : _ref$retryServer;
    var _ref$retryNetwork = _ref.retryNetwork;
    var retryNetwork = _ref$retryNetwork === undefined ? 1 : _ref$retryNetwork;

    fetch(uri).then(function (response) {
      var status = response.status;
      var statusText = response.statusText;

      if (status >= 200 && status < 400) {
        return response.json();
      } else if (status >= 400 && status < 500) {
        _fnShowAlertDialog('Client Error:', status + ' ' + statusText);
        fnOnFailed();
        return null;
      } else if (status >= 500 && status < 600) {
        if (retryServer === 0) {
          retryServer -= 1;
          _this._loadOptionsID = setTimeout(_this._loadOptions({
            toStateProp: toStateProp, uri: uri, fnOnCompleted: fnOnCompleted, fnOnFailed: fnOnFailed,
            retryServer: retryServer, retryNetwork: retryNetwork
          }), 3E3);
        } else {
          _fnShowAlertDialog('Server Error:', status + ' ' + statusText);
          fnOnFailed();
        }
        return null;
      }
    }).then(function (json) {
      if (json) {
        fnOnCompleted({ toStateProp: toStateProp, json: json });
      }
    }).catch(function (error) {
      if (retryNetwork === 0) {
        fnOnFailed(error);
      } else {
        retryNetwork -= 1;
        _this._loadOptionsID = setTimeout(_this._loadOptions({
          toStateProp: toStateProp, uri: uri, fnOnCompleted: fnOnCompleted, fnOnFailed: fnOnFailed,
          retryServer: retryServer, retryNetwork: retryNetwork
        }), 2E3);
      }
    });
  },
  _onLoadOptionsCompleted: function _onLoadOptionsCompleted(_ref2) {
    var toStateProp = _ref2.toStateProp;
    var json = _ref2.json;
    var optionsJsonProp = this.props.optionsJsonProp;

    if (toStateProp && optionsJsonProp) {
      this.setState(_defineProperty({
        isLoading: false
      }, toStateProp, json[optionsJsonProp]));
    }
  },
  _onLoadOptionsFailed: function _onLoadOptionsFailed(error) {
    this.setState({
      isLoading: false,
      isLoadingFailed: true
    });
    if (error instanceof TypeError) {
      _fnShowAlertDialog(_Msg2.default.Alert.NETWORK_ERROR.caption, _Msg2.default.Alert.NETWORK_ERROR.descr);
    }
  },
  _handlerWithLoadOptions: function _handlerWithLoadOptions(toStateProp) {
    var optionURI = this.props.optionURI;

    if (optionURI) {
      this.setState({ isLoading: true, isLoadingFailed: false }, this._loadOptions({
        toStateProp: toStateProp,
        uri: optionURI,
        fnOnCompleted: this._onLoadOptionsCompleted,
        fnOnFailed: this._onLoadOptionsFailed
      }));
    }
  },
  _unmountWithLoadOptions: function _unmountWithLoadOptions() {
    if (this._loadOptionsID) {
      clearTimeout(this._loadOptionsID);
    }
  }
};

exports.default = WithLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\WithLoadOptions.js.map