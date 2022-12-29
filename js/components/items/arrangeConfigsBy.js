"use strict";

exports.__esModule = true;
exports.default = void 0;
const arrangeConfigsBy = (configs, configIds, idPropName) => {
  const _hmConfigs = (configs || []).reduce((hm, config) => {
    hm[config[idPropName]] = config;
    return hm;
  }, {});
  return configIds.reduce((arrangedConfigs, id) => {
    arrangedConfigs.push(_hmConfigs[id]);
    return arrangedConfigs;
  }, []);
};
var _default = arrangeConfigsBy;
exports.default = _default;
//# sourceMappingURL=arrangeConfigsBy.js.map