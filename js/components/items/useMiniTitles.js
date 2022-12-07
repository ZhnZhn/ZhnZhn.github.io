"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const _crMiniTitles = (miniTitles, btTitle) => miniTitles.indexOf(btTitle) === -1 ? [btTitle, ...miniTitles] : miniTitles.filter(t => t !== btTitle);

const useMiniTitles = () => {
  const [miniTitles, setMiniTitles] = (0, _uiApi.useState)([]),
        _hMiniChart = (0, _uiApi.useCallback)(btTitle => {
    setMiniTitles(prevState => _crMiniTitles(prevState, btTitle));
  }, []);

  return [miniTitles, _hMiniChart];
};

var _default = useMiniTitles;
exports.default = _default;
//# sourceMappingURL=useMiniTitles.js.map