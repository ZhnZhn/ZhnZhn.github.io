"use strict";

exports.__esModule = true;
exports.Spots = exports.Spot = exports.SparkView = exports.ReferenceLine = exports.MinLabel = exports.MaxLabel = exports.Line = exports.Bars = void 0;
var _loadAsset = require("../../routers/loadAsset");
var _crRetryableLazy = require("./crRetryableLazy");
const _fLazy = compName => () => (0, _loadAsset.loadSparklines)().then(moduleDefault => (0, _crRetryableLazy.crModuleDefault)(moduleDefault[compName]));
const SparkView = exports.SparkView = (0, _crRetryableLazy.crRetryableLazy)(_fLazy('SparkView'));
const Line = exports.Line = (0, _crRetryableLazy.crRetryableLazy)(_fLazy('Line'));
const Bars = exports.Bars = (0, _crRetryableLazy.crRetryableLazy)(_fLazy('Bars'));
const ReferenceLine = exports.ReferenceLine = (0, _crRetryableLazy.crRetryableLazy)(_fLazy('ReferenceLine'));
const Spot = exports.Spot = (0, _crRetryableLazy.crRetryableLazy)(_fLazy('Spot'));
const Spots = exports.Spots = (0, _crRetryableLazy.crRetryableLazy)(_fLazy('Spot'));
const MaxLabel = exports.MaxLabel = (0, _crRetryableLazy.crRetryableLazy)(_fLazy('MaxLabel'));
const MinLabel = exports.MinLabel = (0, _crRetryableLazy.crRetryableLazy)(_fLazy('MinLabel'));
//# sourceMappingURL=SparklinesLazy.js.map