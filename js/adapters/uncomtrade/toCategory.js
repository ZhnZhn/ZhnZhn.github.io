"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = require("../../charts/Tooltip");

var _TreeMapFn = require("../TreeMapFn");

var _fnAdapter = require("./fnAdapter");

const _compareByY = (a, b) => b.y - a.y;

const _crData = json => {
  const data = [];
  let total = 0;
  json.dataset.forEach(item => {
    const value = (0, _fnAdapter.getItemTradeValue)(item);

    if ((0, _fnAdapter.isPositiveNumber)(value)) {
      const cmdCode = (0, _fnAdapter.getItemCmdCode)(item),
            cmdDescE = (0, _fnAdapter.getItemCmdDescE)(item);
      total += value;
      data.push({
        id: cmdCode,
        c: cmdCode + ' ' + cmdDescE,
        y: value
      });
    }
  });
  data.sort(_compareByY);
  const categories = data.map(p => p.c);
  (0, _TreeMapFn.addColorsTo)({
    data,
    total,
    propName: "y"
  });
  return [data, categories];
};

const toCategory = (json, option) => {
  const [data, categories] = _crData(json),
        title = (0, _fnAdapter.crCategoryTitle)(option),
        config = (0, _ConfigBuilder.default)().barOrColumnConfig('BAR', categories).addCaption(title, option.subtitle).addTooltip(_Tooltip.tooltipCategory).add({
    chart: {
      spacingTop: 25
    },
    info: (0, _fnAdapter.crInfo)(json, option),
    zhConfig: (0, _fnAdapter.crZhConfig)(option)
  }).toConfig();

  config.series[0].data = data;
  config.series[0].name = title;
  config.zhConfig.isWithoutIndicator = false;
  return config;
};

var _default = toCategory;
exports.default = _default;
//# sourceMappingURL=toCategory.js.map