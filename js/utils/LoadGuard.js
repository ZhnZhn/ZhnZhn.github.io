"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var LoadGuard = /*#__PURE__*/function () {
  function LoadGuard(mls) {
    if (mls === void 0) {
      mls = 5000;
    }

    this.mls = mls;
    this.isLoading = false; //loadingUrl
    //timeoutId
  }

  var _proto = LoadGuard.prototype;

  _proto.start = function start(url) {
    var _this = this;

    if (this.isLoading) {
      return false;
    }

    this.loadingUrl = url;
    this.isLoading = true;
    this.timeoutId = setTimeout(function () {
      if (url === _this.loadingUrl) {
        _this.isLoading = false;
      }
    }, this.mls);
    return true;
  };

  _proto.stop = function stop() {
    this.isLoading = false;
    clearTimeout(this.timeoutId);
  };

  return LoadGuard;
}();

var _default = LoadGuard;
exports["default"] = _default;
//# sourceMappingURL=LoadGuard.js.map