"use strict";

exports.__esModule = true;
exports.toDescr = void 0;
var _crFn = require("../crFn");
var _conf = require("./conf");
const _crWebsiteLink = _crFn.crItemLink.bind(null, "Website UN Comtrade Data", "https://comtradeplus.un.org/TradeFlow/");
const _crDescr = json => {
  return _conf.DESCR_EMPTY;
};
const toDescr = (json, option) => option.period ? option.subtitle + _crWebsiteLink() : _crDescr(json) + _crWebsiteLink();
exports.toDescr = toDescr;
//# sourceMappingURL=fnDescr.js.map