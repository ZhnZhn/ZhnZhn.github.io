"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data) {
    return data.sort(function (a, b) {
        return a - b;
    })[Math.floor(data.length / 2)];
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-sparklines\dataProcessing\median.js.map