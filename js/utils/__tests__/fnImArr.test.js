'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _fnImArr = require('../fnImArr');

var _fnImArr2 = _interopRequireDefault(_fnImArr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var push = _fnImArr2.default.push,
    insertItem = _fnImArr2.default.insertItem,
    filterByPropFn = _fnImArr2.default.filterByPropFn,
    editByPropFn = _fnImArr2.default.editByPropFn;


describe('push', function () {
    test('should push obj', function () {
        var arr = [{ a: 1 }],
            obj = { b: 2 },
            result = push(arr, obj),
            maxIndex = result.length - 1;

        expect(result).not.toBe(arr);
        expect(result[maxIndex]).not.toBe(obj);
        expect(result[maxIndex]).toEqual(obj);
    });
});

describe('filterByPropFn', function () {
    test('should filter by propName arr and propValue', function () {
        var arr = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }],
            fn = filterByPropFn('a'),
            result = fn(arr, 1);

        expect(typeof fn === 'undefined' ? 'undefined' : (0, _typeof3.default)(fn)).toBe('function');
        expect(result).not.toBe(arr);
        expect(result.length).toBe(2);
    });
});

describe('insertItem', function () {
    var arr = [{ a: 1 }, { b: 2 }, { c: 3 }],
        obj = { d: 4 };
    test('should insert obj to arr, index=0', function () {
        var result = insertItem(obj, 0, arr);

        expect(result).not.toBe(arr);
        expect(result[0]).not.toBe(obj);
        expect(result[0]).toEqual(obj);
        expect(result.length).toBe(arr.length + 1);
    });
    test('should insert obj to arr, index=length', function () {
        var index = arr.length,
            result = insertItem(obj, index, arr);

        expect(result).not.toBe(arr);
        expect(result[index]).not.toBe(obj);
        expect(result[index]).toEqual(obj);
        expect(result.length).toBe(arr.length + 1);
    });
});

describe('editByPropFn', function () {
    test('should edit obj in arr by propName and index', function () {
        var arr = [{ a: 1 }, { a: 2 }, { a: 3 }],
            fn = editByPropFn('a'),
            result = fn(arr, 0, 4);

        expect(typeof fn === 'undefined' ? 'undefined' : (0, _typeof3.default)(fn)).toBe('function');
        expect(result).not.toBe(arr);
        expect(result[0]).toEqual({ a: 4 });
    });
});
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\__tests__\fnImArr.test.js.map