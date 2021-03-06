"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var WITHOUT_API_KEY = 'Without Api Key';

var _crForReqToken = function _crForReqToken(providerName) {
  return ['For this type of', providerName, 'request'].filter(Boolean).join(' ');
};

var AND_THEN_ENTER_KEY = 'and then enter your API key in dialog SETTINGS [s].';
var Msg = {
  setAlertMsg: function setAlertMsg(option, msg) {
    var caption = msg.caption,
        descr = msg.descr;
    option.alertCaption = caption;
    option.alertDescr = descr;
  },
  IS_EMPTY_NAME: function IS_EMPTY_NAME(item) {
    return item + " name can not be empty.";
  },
  NOT_SELECTED: function NOT_SELECTED(item) {
    return item + " is not selected.";
  },
  NOT_VALID_FORMAT: function NOT_VALID_FORMAT(item) {
    return item + " is not in valid format.";
  },
  YMD_DATE_OR_EMPTY: "YYYY-MM-DD format must be OR Empty",
  Alert: {
    ALREADY_EXIST: {
      caption: 'Check Error',
      descr: 'The chart for this code has already existed in a container. Please, close it and load again.'
    },
    LOADING_IN_PROGRESS: {
      caption: 'Loading In Progress Error',
      descr: 'Loading the chart for this item-code in progress.\nIt seems several clicks on button Load repeatedly happend.'
    },
    DOUBLE_LOAD_META: {
      caption: 'Double Load Meta Error',
      descr: 'Meta data for this code already have been loaded.'
    },
    PREMIUM_WITHOUT_KEY: {
      caption: WITHOUT_API_KEY,
      descr: '403 : Forbidden\n\nYou have attempted to view a premium database in anonymous mode, i.e., without providing a Quandl key. Please register for a free Quandl account, and then enter your API in dialog SETTINGS [s].'
    },
    FEATURE_WITHOUT_KEY: {
      caption: WITHOUT_API_KEY,
      descr: _crForReqToken() + " a Quandl API key is required. Please register for a free Quandl account, " + AND_THEN_ENTER_KEY
    },
    withoutApiKey: function withoutApiKey(providerName) {
      return {
        caption: WITHOUT_API_KEY,
        descr: _crForReqToken() + " a " + providerName + " API key is required. Please register for a free " + providerName + " account, more top button A in dialog, " + AND_THEN_ENTER_KEY
      };
    },
    withoutProxy: function withoutProxy(providerName) {
      return {
        caption: 'Without Proxy Server',
        descr: _crForReqToken(providerName) + " local HTTP proxy server is required. Could be set in dialog SETTINGS [s]."
      };
    },
    TOO_MANY_REQUEST: {
      caption: 'Http Code 429',
      descr: 'Too many request in a given amount of time (rate limiting)'
    },
    NETWORK_ERROR: {
      caption: 'Network Error',
      descr: 'Network error is encountered. Failed to fetch. Maybe you are offline or a DNS lookup failure or a data provider does not respond.'
    },
    ERR_10: {
      token: 'ERR_10',
      caption: 'Not Allowed to Add',
      descr: "This type of request isn't allowed to be added to selected chart. It can be loaded in his own chart or view item."
    }
  }
};
var _default = Msg;
exports["default"] = _default;
//# sourceMappingURL=Msg.js.map