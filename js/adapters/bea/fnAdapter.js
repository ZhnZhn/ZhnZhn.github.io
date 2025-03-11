"use strict";

exports.__esModule = true;
exports.getResultsData = exports.getResults = exports.getResError = exports.getFrequency = exports.crData = exports.crConfOption = exports.BEA_DATA_URL = void 0;
var _arrFn = require("../../utils/arrFn");
var _AdapterFn = require("../AdapterFn");
const BEA_DATA_URL = exports.BEA_DATA_URL = "https://apps.bea.gov";
const INDUSTRY_FACTSHEET_URL = `${BEA_DATA_URL}/industry/factsheet/factsheet.html`;
const getFrequency = item => (0, _AdapterFn.getCaption)(item, "").indexOf("(A,Q)") === -1 ? "A" : "Q";
exports.getFrequency = getFrequency;
const _getBeaapi = json => (json || {}).BEAAPI || {};
const getResults = json => _getBeaapi(json).Results,
  getResError = json => _getBeaapi(json).Error,
  getResultsData = Results => (0, _AdapterFn.getByPropsFrom)(Results, ...((0, _AdapterFn.isArr)(Results) ? [0, "Data"] : ["Data"]));
exports.getResultsData = getResultsData;
exports.getResError = getResError;
exports.getResults = getResults;
const _getResultsInfo = Results => (0, _AdapterFn.isArr)(Results) ? Results[0] : Results;
const _crName = info => (0, _arrFn.joinByColon)(info.Statistic, (info.UTCProductionTime || "").replace("T", " "));
const _crDescr = info => (info.Notes || []).map(note => {
  const {
    NoteRef = '',
    NoteText = ''
  } = note || {};
  return `<p>${NoteRef}: ${NoteText}</p><br/>`;
}).join('');
const _crInfo = Results => {
  const _info = _getResultsInfo(Results) || {};
  return {
    name: _crName(_info),
    description: _crDescr(_info)
  };
};
const _crDfLinkCondig = (ValueName, industryItem) => ValueName === "Industry" && getFrequency(industryItem) === "Q" ? (0, _AdapterFn.crDfLink)(`BEA ${(0, _AdapterFn.getCaption)(industryItem)}`, `${INDUSTRY_FACTSHEET_URL}#${(0, _AdapterFn.getValue)(industryItem)}`) : void 0;
const _crZhConfig = _ref => {
  let {
    ValueName,
    items,
    _itemKey,
    itemCaption,
    dataSource
  } = _ref;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption,
    dataSource,
    ..._crDfLinkCondig(ValueName, items[0])
  };
};
const MD = {
  DF: "-12-31",
  I: "-03-31",
  II: "-06-30",
  III: "-09-30"
};
const _crUTC = item => {
  const md = item.Frequency === "Q" ? MD[item.Quarter] || MD.DF : MD.DF;
  return (0, _AdapterFn.ymdToUTC)(item.Year + md);
};
const crData = (json, option) => {
  const Results = getResults(json),
    {
      dfFilterName,
      items
    } = option,
    two = (0, _AdapterFn.getValue)(items[1]),
    isFilter = dfFilterName ? true : false;
  return (getResultsData(Results) || []).reduce((data, item) => {
    if ((0, _AdapterFn.isObj)(item)) {
      const v = parseFloat(item.DataValue),
        dateMls = _crUTC(item);
      if ((0, _AdapterFn.isNumber)(dateMls) && !(isFilter && item[dfFilterName] !== two)) {
        data.push({
          x: dateMls,
          y: (0, _AdapterFn.isNaN)(v) ? null : v
        });
      }
    }
    return data;
  }, []);
};
exports.crData = crData;
const crConfOption = (option, json) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(getResults(json))
});
exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map