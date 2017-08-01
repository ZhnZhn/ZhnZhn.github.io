"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  RPrefixDashOne: function RPrefixDashOne(prefix, one) {
    return prefix + "_" + one;
  },
  RPrefixOneTwo: function RPrefixOneTwo(prefix, one, two) {
    return prefix + "/" + one + "_" + two;
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

  ROecd: function ROecd(one, two, three) {
    if (three) {
      return "OECD/" + two + "_" + one + "_" + three;
    } else {
      return "OECD/" + two + "_" + one;
    }
  },

  RZill: function RZill(one, two, three) {
    return "ZILL/" + two + three + "_" + one;
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

exports.default = RouterFnValue;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\RouterFnValue.js.map