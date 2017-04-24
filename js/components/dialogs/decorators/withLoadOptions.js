'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Msg = require('../../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _ComponentActions = require('../../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _Type = require('../../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fnShowAlertDialog = function _fnShowAlertDialog(alertCaption, alertDescr) {
  var modalDialogType = _Type.ModalDialog.ALERT;
  _ComponentActions2.default.showModalDialog(_Type.ModalDialog.ALERT, { alertCaption: alertCaption, alertDescr: alertDescr, modalDialogType: modalDialogType });
};

var _loadOptions = function _loadOptions(option) {
  var target = option.target,
      toStateProp = option.toStateProp,
      isLoadingProp = option.isLoadingProp,
      isLoadingFailedProp = option.isLoadingFailedProp,
      uri = option.uri,
      optionJsonProp = option.optionJsonProp,
      fnOnCompleted = option.fnOnCompleted,
      fnOnFailed = option.fnOnFailed,
      _option$retryServer = option.retryServer,
      retryServer = _option$retryServer === undefined ? 3 : _option$retryServer,
      _option$retryNetwork = option.retryNetwork,
      retryNetwork = _option$retryNetwork === undefined ? 1 : _option$retryNetwork;

  fetch(uri).then(function (response) {
    var status = response.status,
        statusText = response.statusText;

    if (status >= 200 && status < 400) {
      return response.json();
    } else if (status >= 400 && status < 500) {
      _fnShowAlertDialog('Client Error:', status + ' ' + statusText);
      fnOnFailed(target, { isLoadingProp: isLoadingProp, isLoadingFailedProp: isLoadingFailedProp });
      return null;
    } else if (status >= 500 && status < 600) {
      if (retryServer !== 0) {
        option.retryServer = retryServer - 1;
        target._loadOptionsID = setTimeout(_loadOptions(option), 3E3);
      } else {
        _fnShowAlertDialog('Server Error:', status + ' ' + statusText);
        fnOnFailed(target, { isLoadingProp: isLoadingProp, isLoadingFailedProp: isLoadingFailedProp });
      }
      return null;
    }
  }).then(function (json) {
    if (json) {
      fnOnCompleted(target, { toStateProp: toStateProp, isLoadingProp: isLoadingProp, json: json, optionJsonProp: optionJsonProp });
    }
  }).catch(function (error) {
    if (retryNetwork === 0) {
      fnOnFailed(target, { error: error, isLoadingProp: isLoadingProp, isLoadingFailedProp: isLoadingFailedProp });
    } else {
      option.retryNetwork = retryNetwork - 1;
      target._loadOptionsID = setTimeout(_loadOptions(option), 2E3);
    }
  });
};

var _onLoadOptionsCompleted = function _onLoadOptionsCompleted(target, _ref) {
  var toStateProp = _ref.toStateProp,
      isLoadingProp = _ref.isLoadingProp,
      json = _ref.json,
      optionJsonProp = _ref.optionJsonProp;

  if (toStateProp && optionJsonProp) {
    var _target$setState;

    target.setState((_target$setState = {}, (0, _defineProperty3.default)(_target$setState, isLoadingProp, false), (0, _defineProperty3.default)(_target$setState, toStateProp, json[optionJsonProp]), _target$setState));
  }
};

var _onLoadOptionsFailed = function _onLoadOptionsFailed(target, _ref2) {
  var _target$setState2;

  var error = _ref2.error,
      isLoadingProp = _ref2.isLoadingProp,
      isLoadingFailedProp = _ref2.isLoadingFailedProp;

  target.setState((_target$setState2 = {}, (0, _defineProperty3.default)(_target$setState2, isLoadingProp, false), (0, _defineProperty3.default)(_target$setState2, isLoadingFailedProp, true), _target$setState2));
  if (error instanceof TypeError) {
    _fnShowAlertDialog(_Msg2.default.Alert.NETWORK_ERROR.caption, _Msg2.default.Alert.NETWORK_ERROR.descr);
  }
};

var _handlerWithLoadOptions = function _handlerWithLoadOptions(toStateProp) {
  var isLoadingProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'isLoading';
  var isLoadingFailedProp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'isLoadingFailed';
  var optionURI = arguments[3];
  var optionJsonProp = arguments[4];

  if (this.props.optionURI || optionURI) {
    var _setState;

    var _uri = optionURI ? optionURI : this.props.optionURI,
        _jsonProp = optionJsonProp ? optionJsonProp : this.props.optionsJsonProp;
    this.setState((_setState = {}, (0, _defineProperty3.default)(_setState, isLoadingProp, true), (0, _defineProperty3.default)(_setState, isLoadingFailedProp, false), _setState), _loadOptions({
      target: this,
      toStateProp: toStateProp, isLoadingProp: isLoadingProp, isLoadingFailedProp: isLoadingFailedProp,
      uri: _uri,
      optionJsonProp: _jsonProp,
      fnOnCompleted: _onLoadOptionsCompleted,
      fnOnFailed: _onLoadOptionsFailed
    }));
  }
};
var _unmountWithLoadOptions = function _unmountWithLoadOptions() {
  if (this._loadOptionsID) {
    clearTimeout(this._loadOptionsID);
  }
};

var withLoadOptions = function withLoadOptions(target) {
  var _proto = target.prototype;
  _proto._handlerWithLoadOptions = _handlerWithLoadOptions;
  _proto._unmountWithLoadOptions = _unmountWithLoadOptions;
};

exports.default = withLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\decorators\withLoadOptions.js.map