"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ComponentActions = require("../actions/ComponentActions");

var _LocationQuery = _interopRequireDefault(require("./LocationQuery"));

const {
  crOptions
} = _LocationQuery.default;
const ARR_B = ['UN', 'QE', 'FAO'];
const ARR_C = ['SM_WIKI', 'SM_IEX_CHART_5Y', 'SM_IEX_CHART_2Y', 'USAE_BLS_1', 'BC_HD'];

const _isArrInclude = (arr, value) => arr.indexOf(value) !== -1;

const _isQuery = obj => obj && obj.v && _isArrInclude(ARR_C, obj.cT) || _isArrInclude(ARR_B, obj.bT);

const _trSearchToOptions = () => {
  var _window, _window$location;

  const search = (_window = window) == null ? void 0 : (_window$location = _window.location) == null ? void 0 : _window$location.search;

  if (!search || search.length > 120) {
    return;
  }

  const options = crOptions(new URLSearchParams(search));
  return _isQuery(options) ? options : void 0;
};

const LocationSearch = {
  load: () => {
    const options = _trSearchToOptions();

    if (options) {
      _ComponentActions.ComponentActions.showAsk({
        options
      });
    }
  }
};
var _default = LocationSearch;
exports.default = _default;
//# sourceMappingURL=LocationSearch.js.map