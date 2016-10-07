"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RouterFnValue = {
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
    return prefix + "_" + one;
  },
  RPrefixOneTwo: function RPrefixOneTwo(prefix, one, two) {
    return prefix + "/" + one + "_" + two;
  },
  RPrefixOneTwoWithoutDash: function RPrefixOneTwoWithoutDash(prefix, one, two) {
    return prefix + "/" + one + two;
  },
  RPrefixTwoOne: function RPrefixTwoOne(prefix, one, two) {
    return prefix + "/" + two + "_" + one;
  },

  RZill: function RZill(one, two, three) {
    return "ZILL/" + two + three + "_" + one;
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

  RPrefixInseeM: function RPrefixInseeM(prefix, item) {
    return "INSEE/" + prefix + "_" + item + "_M";
  },
  RPrefixInseeTwoM: function RPrefixInseeTwoM(prefix, group, item) {
    return "INSEE/" + prefix + "_" + item + "_M";
  }
};

exports.default = RouterFnValue;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\RouterFnValue.js.map