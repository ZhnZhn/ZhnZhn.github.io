"use strict";

exports.__esModule = true;
exports.toDescr = void 0;
var _crFn = require("../crFn");
var _conf = require("./conf");
const _crWebsiteLink = (0, _crFn.fCrItemLinkByUrl)("Website UN Comtrade Data", "https://comtradeplus.un.org/TradeFlow/");

//Caution: The results depend on available reported data, and the level of details may vary.

const _crDescr = json => _conf.DESCR_EMPTY;
const toDescr = (json, option) => option.period ? option.subtitle + _crWebsiteLink() : _crDescr(json) + _crWebsiteLink();
exports.toDescr = toDescr;
//# sourceMappingURL=fnDescr.js.map