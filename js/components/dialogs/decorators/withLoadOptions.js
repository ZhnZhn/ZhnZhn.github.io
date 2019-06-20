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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NETWORK_ERROR = _Msg2.default.Alert.NETWORK_ERROR;

var _showMsgErr = function _showMsgErr(alertCaption, alertDescr) {
  _ComponentActions2.default.showAlert({ alertCaption: alertCaption, alertDescr: alertDescr });
};

var _loadOptions = function _loadOptions(option) {
  var target = option.target,
      toStateProp = option.toStateProp,
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
      _showMsgErr('Client Error:', status + ' ' + statusText);
      fnOnFailed(target);
      return null;
    } else if (status >= 500 && status < 600) {
      if (retryServer !== 0) {
        option.retryServer = retryServer - 1;
        target._loadOptionsID = setTimeout(_loadOptions(option), 3E3);
      } else {
        _showMsgErr('Server Error:', status + ' ' + statusText);
        fnOnFailed(target);
      }
      return null;
    }
  }).then(function (json) {
    if (json) {
      fnOnCompleted(target, { toStateProp: toStateProp, json: json, optionJsonProp: optionJsonProp });
    }
  }).catch(function (error) {
    if (retryNetwork === 0) {
      fnOnFailed(target, error);
    } else {
      option.retryNetwork = retryNetwork - 1;
      target._loadOptionsID = setTimeout(_loadOptions(option), 2E3);
    }
  });
};

var _onLoadOptionsCompleted = function _onLoadOptionsCompleted(target, _ref) {
  var toStateProp = _ref.toStateProp,
      json = _ref.json,
      optionJsonProp = _ref.optionJsonProp;

  if (toStateProp && optionJsonProp) {
    if (!json.dfColumns) {
      target.setState((0, _defineProperty3.default)({
        isLoading: false
      }, toStateProp, json[optionJsonProp]));
    } else {
      var _target$setState2;

      target._isDfColumns = true;
      target.setState((_target$setState2 = {
        isLoading: false
      }, (0, _defineProperty3.default)(_target$setState2, toStateProp, json[optionJsonProp]), (0, _defineProperty3.default)(_target$setState2, 'twoOptions', json.dfColumns), _target$setState2));
    }
  }
};

var _onLoadOptionsFailed = function _onLoadOptionsFailed(target, error) {
  target.setState({
    isLoading: false,
    isLoadingFailed: true
  });
  if (error instanceof TypeError) {
    _showMsgErr(NETWORK_ERROR.caption, NETWORK_ERROR.descr);
  }
};

var _handlerWithLoadOptions = function _handlerWithLoadOptions(toStateProp, optionURI, optionJsonProp) {
  var _uri = optionURI || this.props.optionURI;
  if (_uri) {
    var _jsonProp = optionJsonProp || this.props.optionsJsonProp;
    this.setState({
      isLoading: true,
      isLoadingFailed: false
    }, _loadOptions({
      target: this,
      toStateProp: toStateProp,
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
  Object.assign(target.prototype, {
    _handlerWithLoadOptions: _handlerWithLoadOptions,
    _unmountWithLoadOptions: _unmountWithLoadOptions
  });
};

exports.default = withLoadOptions;
//# sourceMappingURL=withLoadOptions.js.map