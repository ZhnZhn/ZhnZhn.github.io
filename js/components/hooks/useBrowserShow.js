"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _has = require("../has");
var _useBool = _interopRequireDefault(require("./useBool"));
var _fUseKey = require("./fUseKey");
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
  return [isShow, hideBrowser, /*eslint-disable react-hooks/rules-of-hooks*/
  _has.HAS_KEYBOARD_FOCUS && (0, _fUseKey.useKeyEscape)(hideBrowser)
  /*eslint-enable react-hooks/rules-of-hooks*/];
};
var _default = exports.default = useBrowserShow;
//# sourceMappingURL=useBrowserShow.js.map