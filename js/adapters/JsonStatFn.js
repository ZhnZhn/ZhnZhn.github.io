"use strict";

exports.__esModule = true;
exports.getDatasetUpdated = exports.getDatasetSource = exports.getDatasetLabel = exports.crCategoryData = void 0;
var _AdapterFn = require("./AdapterFn");
var _CategoryFn = require("./CategoryFn");
const _compareByPropNameY = (a, b) => b.y - a.y;
const _isDatasetVersion2 = json => json.class === "dataset" && json.version === "2.0",
  _getDataset = json => {
    const _json = json || {};
    return _isDatasetVersion2(_json) ? _json : _json.dataset || {};
  },
  _fGetDataset = (propName, dfValue) => json => _getDataset(json)[propName] || dfValue;
const _getDatasetDimension = _fGetDataset("dimension", {});
const _getDatasetValue = _fGetDataset("value", {});
const _getIdSizeTuple = json => {
  const _json = json || {},
    dimension = _isDatasetVersion2(_json) ? _json : _getDatasetDimension(_json);
  return [dimension.id || [], dimension.size || []];
};
const _getCategoryIndexLabel = (id, size, dimension) => {
  const categoryIndex = size.findIndex(v => v !== 1),
    categoryPropName = categoryIndex !== -1 ? id[categoryIndex] : '';
  return categoryPropName && (dimension[categoryPropName] || {}).category || {} || {};
};
const _crCategoryLabel = (categoryLabel, hmLabels) => {
  const _categoryNumber = hmLabels[categoryLabel];
  return _categoryNumber ? (++hmLabels[categoryLabel], `${categoryLabel} (${_categoryNumber + 1})`) : (hmLabels[categoryLabel] = 1, categoryLabel);
};
const _fCrCategoryData = crPoint => json => {
    const dimension = _getDatasetDimension(json),
      value = _getDatasetValue(json),
      [id, size] = _getIdSizeTuple(json),
      {
        index,
        label
      } = _getCategoryIndexLabel(id, size, dimension),
      hmLabels = {};
    let _valueIndex;
    return (0, _AdapterFn.isObj)(index) && (0, _AdapterFn.isObj)(label) ? (0, _AdapterFn.getObjectKeys)(label).reduce((data, labelKey) => {
      _valueIndex = index[labelKey];
      if (_valueIndex != null) {
        const y = value[_valueIndex],
          categoryLabel = label[labelKey];
        if ((0, _AdapterFn.isNumber)(y) && (0, _AdapterFn.isStr)(categoryLabel)) {
          data.push(crPoint(y, _crCategoryLabel(categoryLabel, hmLabels)));
        }
      }
      return data;
    }, []) : [];
  },
  _crCategoryDataImpl = _fCrCategoryData(_CategoryFn.crCategoryPoint);
const crCategoryData = json => _crCategoryDataImpl(json).sort(_compareByPropNameY);
exports.crCategoryData = crCategoryData;
const getDatasetLabel = exports.getDatasetLabel = _fGetDataset("label");
const getDatasetUpdated = exports.getDatasetUpdated = _fGetDataset("updated");
const getDatasetSource = exports.getDatasetSource = _fGetDataset("source");
//# sourceMappingURL=JsonStatFn.js.map