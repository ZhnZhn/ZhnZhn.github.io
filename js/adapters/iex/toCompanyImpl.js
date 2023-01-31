"use strict";

exports.__esModule = true;
exports.default = void 0;
var _toFns = require("./toFns");
const _crEmployees = _ref => {
  let {
    employees
  } = _ref;
  return (0, _toFns.toStr)(employees);
};
const _crExchange = _ref2 => {
  let {
    exchange
  } = _ref2;
  return exchange === 'New York Stock Exchange' ? 'NYSE' : exchange;
};
const _crIssueType = _ref3 => {
  let {
    issueType
  } = _ref3;
  return (issueType || '').toUpperCase();
};
const _crWebSite = _ref4 => {
  let {
    website
  } = _ref4;
  return (website || '').replace('http://', '');
};
const toCompanyImpl = {
  CONFIGS: ['country', 'city', 'state', _crEmployees, 'sector', 'industry', _crExchange, _crIssueType, 'securityName', _crWebSite],
  crCaption: _ref5 => {
    let {
      companyName,
      symbol
    } = _ref5;
    return companyName + ' ' + symbol;
  },
  crDesr: _ref6 => {
    let {
      description
    } = _ref6;
    return description || '';
  }
};
var _default = toCompanyImpl;
exports.default = _default;
//# sourceMappingURL=toCompanyImpl.js.map