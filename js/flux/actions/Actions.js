"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartActions = _interopRequireDefault(require("./ChartActions"));

var _ComponentActions = require("./ComponentActions");

var _BrowserActions = require("./BrowserActions");

var _WatchActions = require("./WatchActions");

const Actions = [_ChartActions.default, _ComponentActions.ComponentActions, _BrowserActions.BrowserActions, _WatchActions.WatchActions];
var _default = Actions;
exports.default = _default;
//# sourceMappingURL=Actions.js.map