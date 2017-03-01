"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data) {
    return data.sort(function (a, b) {
        return a - b;
    })[Math.floor(data.length / 2)];
};
//# sourceMappingURL=median.js.map