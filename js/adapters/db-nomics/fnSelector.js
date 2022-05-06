"use strict";

exports.__esModule = true;
exports.getTitle = exports.getSubtitle = exports.getPeriodAndValue = exports.getIndexedAt = void 0;

const _getDocs = json => ((json || {}).series || {}).docs || {};

const _getByPropName = (json, propName) => _getDocs(json)[0][propName] || '';

const _fGetByPropName = propName => json => _getByPropName(json, propName);

const getPeriodAndValue = json => ({
  period: _getByPropName(json, 'period') || [],
  value: _getByPropName(json, 'value')
});

exports.getPeriodAndValue = getPeriodAndValue;

const getTitle = _fGetByPropName('dataset_name');

exports.getTitle = getTitle;

const getSubtitle = _fGetByPropName('series_name');

exports.getSubtitle = getSubtitle;

const getIndexedAt = _fGetByPropName('indexed_at');

exports.getIndexedAt = getIndexedAt;
//# sourceMappingURL=fnSelector.js.map