"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useMiniConfigs = () => {
  const [miniConfigs, setMiniConfigs] = (0, _react.useState)([]),
        addConfig = (0, _react.useCallback)((config, id) => {
    setMiniConfigs(prevState => {
      prevState.push({
        config,
        id
      });
      return [...prevState];
    });
  }, []),
        removeConfig = (0, _react.useCallback)(id => {
    setMiniConfigs(prevState => prevState.filter(c => c.id !== id));
  }, []);
  return [miniConfigs, addConfig, removeConfig];
};

var _default = useMiniConfigs;
exports.default = _default;
//# sourceMappingURL=useMiniConfigs.js.map