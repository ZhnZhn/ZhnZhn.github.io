"use strict";

exports.__esModule = true;
exports.getTitle = exports.getSubtitle = exports.getPeriodAndValue = exports.getIndexedAt = void 0;
var _fnAdapter = require("./fnAdapter");
const _getByPropName = (json, propName) => (0, _fnAdapter.getDocs)(json)[0][propName] || '';
const _fGetByPropName = propName => json => _getByPropName(json, propName);
const getPeriodAndValue = json => [_getByPropName(json, 'period'), _getByPropName(json, 'value')];
exports.getPeriodAndValue = getPeriodAndValue;
const getTitle = exports.getTitle = _fGetByPropName('dataset_name');
const getSubtitle = exports.getSubtitle = _fGetByPropName('series_name');
const getIndexedAt = exports.getIndexedAt = _fGetByPropName('indexed_at');
//# sourceMappingURL=fnSelector.js.map