"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _crOptions = _interopRequireDefault(require("../crOptions"));

var CAPTION_OPTIONS = {
  items: [{
    caption: 'Abc',
    value: 123
  }]
},
    C_OPTIONS = {
  items: [{
    c: 'Abc',
    v: 123
  }]
},
    S_OPTIONS = {
  items: [{
    c: 'Abc',
    v: 123,
    s: 'Abc'
  }]
},
    IS_CV_OPTIONS = {
  isCv: true,
  items: [{
    c: 'Abc',
    v: 'Abc'
  }]
},
    IS_NBQ_OPTIONS = {
  isNbq: true,
  items: [{
    n: 'Name1',
    b: 'b1',
    q: ['q1', 'q2']
  }]
},
    IS_CP_OPTIONS = {
  isCp: true,
  items: [{
    "c": "Title1 A B",
    "v": "AAA"
  }, {
    "c": "Title2 A B",
    "v": "BBB",
    id: "bbb-token"
  }]
};
describe('crOptions', function () {
  var fn = _crOptions["default"];
  test('should return propCaption undefined for item caption prop name', function () {
    expect(fn(CAPTION_OPTIONS, 'items').propCaption).toBe(void 0);
  });
  test('should return propCaption c for item c prop name', function () {
    expect(fn(C_OPTIONS, 'items').propCaption).toBe('c');
  });
  test('should add item s value to c', function () {
    expect(fn(S_OPTIONS, 'items').items[0].c).toBe('Abc (Abc)');
  });
  test('should return correct options for isCv case', function () {
    expect(fn(IS_CV_OPTIONS, 'items').items[0].c).toBe('Abc (Abc)');
  });
  test('should return correct options for isNbq case', function () {
    expect(fn(IS_NBQ_OPTIONS, 'items').items).toEqual([{
      "c": "Name1 (b1/q1)",
      s: "b1/q1"
    }, {
      "c": "Name1 (b1/q2)",
      s: "b1/q2"
    }]);
  });
  test('should return correct options for isCp case', function () {
    expect(fn(IS_CP_OPTIONS, 'items').items).toEqual([{
      "c": "Title1 A B (AAA)",
      "v": "aaa-title1-a-b"
    }, {
      "c": "Title2 A B (BBB)",
      "v": "bbb-token"
    }]);
  });
});
//# sourceMappingURL=crOptions.test.js.map