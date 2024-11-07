"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _TreeMapFn = require("../TreeMapFn");
var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
var _fnAdapter = require("./fnAdapter");
const _crTreeMapTupleDataTotal = (json, option) => {
    let total = 0;
    const data = [],
      {
        time
      } = option;
    json.data.forEach(item => {
      const _value = parseFloat(item.Value);
      if ((0, _AdapterFn.isPositiveNumber)(_value) && item.Area) {
        total += _value;
        data.push({
          value: _value,
          label: item.Area,
          title: time
        });
      }
    });
    (0, _TreeMapFn.addPercentAndColorToData)(data, total);
    option.subtitle = (0, _fnAdapter.crCategoryTitle)(option.subtitle, json);
    return [data, total];
  },
  _crCaption = (data, option) => [option.subtitle, `${option.title} (${option._ps60}%, ${option._ps90}%)`];
const toTreeMapAdapter = (0, _fToTreeMapAdapter.fToTreeMapAdapter)(_crTreeMapTupleDataTotal, _crCaption);
var _default = exports.default = toTreeMapAdapter;
//# sourceMappingURL=toTreeMapAdapter.js.map