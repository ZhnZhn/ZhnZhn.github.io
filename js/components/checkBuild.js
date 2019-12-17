"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var checkBuild = function checkBuild(BUILD_DATE, reload) {
  if (window.fetch) {
    fetch('./data/build.json', {
      cache: "no-cache"
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Check build: Response " + res.status);
      }
    }).then(function (json) {
      var _json$build = json.build,
          build = _json$build === void 0 ? '' : _json$build;

      if (build !== BUILD_DATE && document.cookie.indexOf('erc') === -1) {
        reload({
          buildDate: BUILD_DATE
        });
      }
    })["catch"](function (err) {
      console.log(err.message);
    });
  }
};

var _default = checkBuild;
exports["default"] = _default;
//# sourceMappingURL=checkBuild.js.map