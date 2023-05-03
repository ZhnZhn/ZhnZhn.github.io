"use strict";

exports.__esModule = true;
exports.withoutProxy = exports.withoutApiKey = exports.setAlertMsg = exports.YMD_DATE_OR_EMPTY = exports.NOT_VALID_FORMAT = exports.NOT_SELECTED = exports.ERR_TOO_MANY_REQUEST = exports.ERR_PREMIUM_WITHOUT_KEY = exports.ERR_NETWORK = exports.ERR_LOADING_IN_PROGRESS = exports.ERR_FEATURE_WITHOUT_KEY = exports.ERR_DOUBLE_LOAD_META = exports.ERR_ALREADY_EXIST = exports.ERR_10 = void 0;
const WITHOUT_API_KEY = 'Without Api Key';
const _crForReqToken = providerName => ['For this type of', providerName, 'request'].filter(Boolean).join(' ');
const AND_THEN_ENTER_KEY = 'and then enter your API key in dialog SETTINGS [s].';
const _crMsg = (caption, descr) => ({
  caption,
  descr
});
const setAlertMsg = (option, msg) => {
  const {
    caption,
    descr
  } = msg;
  option.alertCaption = caption;
  option.alertDescr = descr;
};
exports.setAlertMsg = setAlertMsg;
const NDL = 'Nasdaq Data Link';
const NOT_SELECTED = item => item + " is not selected.";
exports.NOT_SELECTED = NOT_SELECTED;
const NOT_VALID_FORMAT = item => item + " is not in valid format.";
exports.NOT_VALID_FORMAT = NOT_VALID_FORMAT;
const YMD_DATE_OR_EMPTY = "YYYY-MM-DD format must be OR Empty";
exports.YMD_DATE_OR_EMPTY = YMD_DATE_OR_EMPTY;
const ERR_ALREADY_EXIST = _crMsg('Check Error', 'The chart for this code has already existed in a container. Please, close it and load again.');
exports.ERR_ALREADY_EXIST = ERR_ALREADY_EXIST;
const ERR_LOADING_IN_PROGRESS = _crMsg('Loading In Progress Error', 'Loading the chart for this item-code in progress.\nIt seems several clicks on button Load repeatedly happend.');
exports.ERR_LOADING_IN_PROGRESS = ERR_LOADING_IN_PROGRESS;
const ERR_DOUBLE_LOAD_META = _crMsg('Double Load Meta Error', 'Meta data for this code already have been loaded.');
exports.ERR_DOUBLE_LOAD_META = ERR_DOUBLE_LOAD_META;
const ERR_PREMIUM_WITHOUT_KEY = _crMsg(WITHOUT_API_KEY, "403 : Forbidden\n\nYou have attempted to view a premium database in anonymous mode, i.e., without providing a " + NDL + " key. Please register for a free " + NDL + " account, and then enter your API in dialog SETTINGS [s].");
exports.ERR_PREMIUM_WITHOUT_KEY = ERR_PREMIUM_WITHOUT_KEY;
const ERR_FEATURE_WITHOUT_KEY = _crMsg(WITHOUT_API_KEY, _crForReqToken() + " a " + NDL + " API key is required. Please register for a free " + NDL + " account, " + AND_THEN_ENTER_KEY);
exports.ERR_FEATURE_WITHOUT_KEY = ERR_FEATURE_WITHOUT_KEY;
const withoutApiKey = providerName => _crMsg(WITHOUT_API_KEY, _crForReqToken() + " a " + providerName + " API key is required. Please register for a free " + providerName + " account, more top button A in dialog, " + AND_THEN_ENTER_KEY);
exports.withoutApiKey = withoutApiKey;
const withoutProxy = providerName => _crMsg('Without Proxy Server', _crForReqToken(providerName) + " local HTTP proxy server is required. Could be set in dialog SETTINGS [s].");
exports.withoutProxy = withoutProxy;
const ERR_TOO_MANY_REQUEST = _crMsg('Http Code 429', 'Too many request in a given amount of time (rate limiting)');
exports.ERR_TOO_MANY_REQUEST = ERR_TOO_MANY_REQUEST;
const ERR_NETWORK = _crMsg('Network Error', 'Network error is encountered. Failed to fetch. Maybe you are offline or a DNS lookup failure or a data provider does not respond.');
exports.ERR_NETWORK = ERR_NETWORK;
const ERR_10 = {
  ..._crMsg('Not Allowed to Add', "This type of request isn't allowed to be added to selected chart. It can be loaded in his own chart or view item."),
  token: 'ERR_10'
};
exports.ERR_10 = ERR_10;
//# sourceMappingURL=Msg.js.map