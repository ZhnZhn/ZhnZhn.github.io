"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useMiniConfigs = () => {
  const [miniConfigs, setMiniConfigs] = (0, _uiApi.useState)([]),
        addConfig = (0, _uiApi.useCallback)((config, id) => {
    setMiniConfigs(prevState => {
      prevState.push({
        config,
        id
      });
      return [...prevState];
    });
  }, []),
        removeConfig = (0, _uiApi.useCallback)(id => {
    setMiniConfigs(prevState => prevState.filter(c => c.id !== id));
  }, []);
  return [miniConfigs, addConfig, removeConfig];
};

var _default = useMiniConfigs;
exports.default = _default;
//# sourceMappingURL=useMiniConfigs.js.map