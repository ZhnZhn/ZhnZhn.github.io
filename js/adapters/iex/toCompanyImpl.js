"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toFns = _interopRequireDefault(require("./toFns"));

var toStr = _toFns["default"].toStr;

var _crEmployees = function _crEmployees(_ref) {
  var employees = _ref.employees;
  return toStr(employees);
};

var _crExchange = function _crExchange(_ref2) {
  var exchange = _ref2.exchange;
  return exchange === 'New York Stock Exchange' ? 'NYSE' : exchange;
};

var _crIssueType = function _crIssueType(_ref3) {
  var issueType = _ref3.issueType;
  return (issueType || '').toUpperCase();
};

var _crWebSite = function _crWebSite(_ref4) {
  var website = _ref4.website;
  return (website || '').replace('http://', '');
};

var toCompanyImpl = {
  CONFIGS: ['country', 'city', 'state', _crEmployees, 'sector', 'industry', _crExchange, _crIssueType, 'securityName', _crWebSite],
  crCaption: function crCaption(_ref5) {
    var companyName = _ref5.companyName,
        symbol = _ref5.symbol;
    return companyName + ' ' + symbol;
  },
  crDesr: function crDesr(_ref6) {
    var description = _ref6.description;
    return description || '';
  }
};
var _default = toCompanyImpl;
exports["default"] = _default;
//# sourceMappingURL=toCompanyImpl.js.map