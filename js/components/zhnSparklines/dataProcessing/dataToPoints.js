'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _min = require('./min');

var _min2 = _interopRequireDefault(_min);

var _max = require('./max');

var _max2 = _interopRequireDefault(_max);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var data = _ref.data;
    var limit = _ref.limit;
    var _ref$width = _ref.width;
    var width = _ref$width === undefined ? 1 : _ref$width;
    var _ref$height = _ref.height;
    var height = _ref$height === undefined ? 1 : _ref$height;
    var _ref$margin = _ref.margin;
    var margin = _ref$margin === undefined ? 0 : _ref$margin;
    var _ref$max = _ref.max;
    var max = _ref$max === undefined ? (0, _max2.default)(data) : _ref$max;
    var _ref$min = _ref.min;
    var min = _ref$min === undefined ? (0, _min2.default)(data) : _ref$min;


    var len = data.length;

    if (limit && limit < len) {
        data = data.slice(len - limit);
    }

    var vfactor = (height - margin * 2) / (max - min || 2);
    var hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0));

    return data.map(function (d, i) {
        return {
            x: i * hfactor + margin,
            y: (max === min ? 1 : max - d) * vfactor + margin
        };
    });
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\dataProcessing\dataToPoints.js.map