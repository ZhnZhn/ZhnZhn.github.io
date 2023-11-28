"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useBool = _interopRequireDefault(require("./useBool"));
const useBrowserShow = _ref => {
  let {
    isInitShow,
    useMsBrowserShow,
    browserType
  } = _ref;
  const [isShow, showBrowser, hideBrowser] = (0, _useBool.default)(isInitShow);
  useMsBrowserShow(msBrowserShow => {
    if (msBrowserShow && msBrowserShow.browserType === browserType) {
      showBrowser();
    }
  });
  return [isShow, hideBrowser];
};
var _default = exports.default = useBrowserShow;
//# sourceMappingURL=useBrowserShow.js.map