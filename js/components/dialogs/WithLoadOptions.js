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

var _fnShowAlertDialog = function _fnShowAlertDialog(alertCaption, alertDescr) {
  var modalDialogType = _Type.ModalDialog.ALERT;
  _ComponentActions2.default.showModalDialog(_Type.ModalDialog.ALERT, { alertCaption: alertCaption, alertDescr: alertDescr, modalDialogType: modalDialogType });
};

var WithLoadOptions = {
  _loadOptions: function _loadOptions(option) {
    var _this = this;

    var toStateProp = option.toStateProp;
    var isLoadingProp = option.isLoadingProp;
    var isLoadingFailedProp = option.isLoadingFailedProp;
    var uri = option.uri;
    var optionJsonProp = option.optionJsonProp;
    var fnOnCompleted = option.fnOnCompleted;
    var fnOnFailed = option.fnOnFailed;
    var _option$retryServer = option.retryServer;
    var retryServer = _option$retryServer === undefined ? 3 : _option$retryServer;
    var _option$retryNetwork = option.retryNetwork;
    var retryNetwork = _option$retryNetwork === undefined ? 1 : _option$retryNetwork;

    fetch(uri).then(function (response) {
      var status = response.status;
      var statusText = response.statusText;

      if (status >= 200 && status < 400) {
        return response.json();
      } else if (status >= 400 && status < 500) {
        _fnShowAlertDialog('Client Error:', status + ' ' + statusText);
        fnOnFailed(null, isLoadingProp, isLoadingFailedProp);
        return null;
      } else if (status >= 500 && status < 600) {
        if (retryServer !== 0) {
          option.retryServer = retryServer - 1;
          _this._loadOptionsID = setTimeout(_this._loadOptions(option), 3E3);
        } else {
          _fnShowAlertDialog('Server Error:', status + ' ' + statusText);
          fnOnFailed(null, isLoadingProp, isLoadingFailedProp);
        }
        return null;
      }
    }).then(function (json) {
      if (json) {
        fnOnCompleted({ toStateProp: toStateProp, isLoadingProp: isLoadingProp, json: json, optionJsonProp: optionJsonProp });
      }
    }).catch(function (error) {
      if (retryNetwork === 0) {
        fnOnFailed(error, isLoadingProp, isLoadingFailedProp);
      } else {
        option.retryNetwork = retryNetwork - 1;
        _this._loadOptionsID = setTimeout(_this._loadOptions(option), 2E3);
      }
    });
  },
  _onLoadOptionsCompleted: function _onLoadOptionsCompleted(_ref) {
    var toStateProp = _ref.toStateProp;
    var isLoadingProp = _ref.isLoadingProp;
    var json = _ref.json;
    var optionJsonProp = _ref.optionJsonProp;

    if (toStateProp && optionJsonProp) {
      var _setState;

      this.setState((_setState = {}, _defineProperty(_setState, isLoadingProp, false), _defineProperty(_setState, toStateProp, json[optionJsonProp]), _setState));
    }
  },
  _onLoadOptionsFailed: function _onLoadOptionsFailed(error, isLoadingProp, isLoadingFailedProp) {
    var _setState2;

    this.setState((_setState2 = {}, _defineProperty(_setState2, isLoadingProp, false), _defineProperty(_setState2, isLoadingFailedProp, true), _setState2));
    if (error instanceof TypeError) {
      _fnShowAlertDialog(_Msg2.default.Alert.NETWORK_ERROR.caption, _Msg2.default.Alert.NETWORK_ERROR.descr);
    }
  },
  _handlerWithLoadOptions: function _handlerWithLoadOptions(toStateProp) {
    var isLoadingProp = arguments.length <= 1 || arguments[1] === undefined ? 'isLoading' : arguments[1];
    var isLoadingFailedProp = arguments.length <= 2 || arguments[2] === undefined ? 'isLoadingFailed' : arguments[2];
    var optionURI = arguments[3];
    var optionJsonProp = arguments[4];

    if (this.props.optionURI || optionURI) {
      var _setState3;

      var _uri = optionURI ? optionURI : this.props.optionURI,
          _jsonProp = optionJsonProp ? optionJsonProp : this.props.optionsJsonProp;
      this.setState((_setState3 = {}, _defineProperty(_setState3, isLoadingProp, true), _defineProperty(_setState3, isLoadingFailedProp, false), _setState3), this._loadOptions({
        toStateProp: toStateProp, isLoadingProp: isLoadingProp, isLoadingFailedProp: isLoadingFailedProp,
        uri: _uri,
        optionJsonProp: _jsonProp,
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