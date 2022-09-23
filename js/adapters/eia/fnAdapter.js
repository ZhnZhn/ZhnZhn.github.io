"use strict";

exports.__esModule = true;
exports.crTitle = exports.crData = exports.crConfOption = void 0;

var _AdapterFn = require("../AdapterFn");

var _CL = require("../CL");

const CHART_URL = "https://www.eia.gov/opendata/embed.php?type=chart&series_id=";

const _toUTC = str => {
  if (str.length === 6) {
    const _year = str.substring(0, 4),
          _month = parseInt(str.substring(4), 10) - 1,
          _day = _month === 1 ? 28 : 30;

    return Date.UTC(_year, _month, _day);
  }

  if (str.length === 4) {
    return Date.UTC(str, 11, 31);
  }
};

const _crZhConfig = (json, option) => {
  const {
    dataSource,
    key
  } = option,
        id = json.series[0].series_id;
  return {
    id,
    key,
    //itemCaption: title,
    dataSource
  };
};

const _crDescr = s => {
  const {
    description = '',
    units = '',
    source = '',
    series_id = '',
    updated
  } = s;
  return "<p>" + description + "</p>\n  <p>Units: " + units + "</p>\n  <p>Source: " + source + "</p>\n  <p>Updated: " + (updated ? updated.replace('T', ' ') : '') + "</p>\n  <p>Id: " + series_id + "</p>\n  <p><a href=\"" + CHART_URL + series_id + "\" class=\"" + _CL.CL_PT_4 + "\">EIA Chart</a></p>";
};

const _crInfo = json => {
  const _s = json.series[0];
  return {
    name: _s.name,
    description: _crDescr(_s)
  };
};
/* [ ["201806", 1000], ... ] */


const crTitle = _ref => {
  let {
    items = [],
    dfTitle
  } = _ref;

  const _s1 = (0, _AdapterFn.getCaption)(items[0]),
        _s2 = (0, _AdapterFn.getCaption)(items[1]),
        _s3 = (0, _AdapterFn.getCaption)(items[2]),
        _subtitle = "" + _s2 + (_s3 ? ':' : '') + " " + _s3;

  return {
    title: _s1 + ": " + dfTitle,
    subtitle: _subtitle
  };
};

exports.crTitle = crTitle;

const crData = json => json.series[0].data.map(arr => ({
  x: _toUTC(arr[0]),
  y: arr[1]
})).reverse();

exports.crData = crData;

const crConfOption = (option, json) => ({
  zhConfig: _crZhConfig(json, option),
  info: _crInfo(json)
});

exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map