"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useShowHideComponent = _interopRequireDefault(require("./useShowHideComponent"));
const useBrowserShow = _ref => {
  let {
    isInitShow,
    useMsBrowserShow,
    browserType
  } = _ref;
  const [isShow, showBrowser, hideBrowser, hKeyDown] = (0, _useShowHideComponent.default)(isInitShow);
  useMsBrowserShow(msBrowserShow => {
    if (msBrowserShow && msBrowserShow.browserType === browserType) {
      showBrowser();
    }
  });
  return [isShow, hideBrowser, hKeyDown];
};
var _default = exports.default = useBrowserShow;
//# sourceMappingURL=useBrowserShow.js.map