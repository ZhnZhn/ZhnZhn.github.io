"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data) {
    return data.reduce(function (a, b) {
        return a + b;
    }) / data.length;
};
//# sourceMappingURL=mean.js.map