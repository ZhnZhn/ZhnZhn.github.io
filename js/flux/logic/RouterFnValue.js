"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var RouterFnValue = {
  ROne: function ROne(one) {
    return one;
  },
  RTwo: function RTwo(one, two) {
    return "" + two;
  },
  ROneTwo: function ROneTwo(one, two) {
    return one + "/" + two;
  },
  ROneDashTwo: function ROneDashTwo(one, two) {
    return one + "_" + two;
  },
  RPrefixOne: function RPrefixOne(prefix, one) {
    return prefix + "/" + one;
  },
  ROneSufix: function ROneSufix(sufix, one) {
    return one + "/" + sufix;
  },
  RPrefixDashOne: function RPrefixDashOne(prefix, one) {
    return prefix + "_" + one;
  },
  RPrefixOneTwo: function RPrefixOneTwo(prefix, one, two) {
    return prefix + "/" + one + "_" + two;
  },
  TOneTwo: function TOneTwo(one, two) {
    return {
      one: one,
      two: two
    };
  },
  RPrefixOneTwoA: function RPrefixOneTwoA(prefix, one, two) {
    return prefix + "/" + one + "_" + two + "_MRY";
  },
  RPrefixOneEmptyTwo: function RPrefixOneEmptyTwo(prefix, one, two) {
    return prefix + "/" + two;
  },
  RPrefixOneTwoWithoutDash: function RPrefixOneTwoWithoutDash(prefix, one, two) {
    return prefix + "/" + one + two;
  },
  RPrefixTwoOne: function RPrefixTwoOne(prefix, one, two) {
    return prefix + "/" + two + "_" + one;
  },
  RPrefixSlashDash: function RPrefixSlashDash(prefix) {
    for (var _len = arguments.length, arr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arr[_key - 1] = arguments[_key];
    }

    return prefix + "/" + arr.join('_');
  },
  ROecd: function ROecd(one, two, three) {
    return three ? "OECD/" + two + "_" + one + "_" + three : "OECD/" + two + "_" + one;
  },
  RZillow: function RZillow(one, two, three) {
    return "ZILLOW/" + two + three + "_" + one;
  },
  RJodiGas: function RJodiGas(one, two, three) {
    return "JODI/GAS_" + two + three + "_" + one;
  },
  RJodiOil: function RJodiOil(country, product, flow, units) {
    return "JODI/OIL_" + product + flow + units + "_" + country;
  },
  REiaCoal: function REiaCoal(one, two, three) {
    return "EIA/COAL_" + two + "_" + one + "_" + three;
  },
  RFutures: function RFutures(prefix, item, month, year) {
    return prefix + "/" + item + month + year;
  },
  RWikiFutures: function RWikiFutures(exchange, item, type) {
    return "CHRIS/" + exchange + "_" + item + type;
  },
  RPrefixInseeTwoM: function RPrefixInseeTwoM(prefix, group, item) {
    return "INSEE/" + prefix + "_" + item + "_M";
  },
  RInseeTwoM: function RInseeTwoM(group, item) {
    return "INSEE/" + group + "_" + item + "_M";
  },
  RPrefixInseeTwoA: function RPrefixInseeTwoA(prefix, group, item) {
    return "INSEE/" + prefix + "_" + item + "_A";
  },
  RInsee: function RInsee(value) {
    return "INSEE/" + value;
  }
};
var _default = RouterFnValue;
exports["default"] = _default;
//# sourceMappingURL=RouterFnValue.js.map