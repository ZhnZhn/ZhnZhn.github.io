import { joinByColon } from '../../utils/arrFn';

import {
  isNaN,
  isArr,
  isObj,
  isNumber,
  getByPropsFrom,
  getValue,
  getCaption,
  crDfLink,
  ymdToUTC
} from '../AdapterFn';

export const BEA_DATA_URL = "https://apps.bea.gov";
const INDUSTRY_FACTSHEET_URL = `${BEA_DATA_URL}/industry/factsheet/factsheet.html`

export const getFrequency = (
  item
) => getCaption(item, "").indexOf("(A,Q)") === -1
  ? "A"
  : "Q"

const _getBeaapi = json => (json || {}).BEAAPI || {};

export const getResults = json => _getBeaapi(json).Results
, getResError = json => _getBeaapi(json).Error
, getResultsData = Results => getByPropsFrom(Results,
  ...isArr(Results)
    ? [0, "Data"]
    : ["Data"]
)

const _getResultsInfo = Results => isArr(Results)
  ? Results[0]
  : Results;

const _crName = info => joinByColon(
  info.Statistic,
  (info.UTCProductionTime || "").replace("T", " ")
);

const _crDescr = info => (info.Notes || [])
  .map(note => {
    const { NoteRef='', NoteText='' } = note || {};
    return `<p>${NoteRef}: ${NoteText}</p><br/>`;
  }).join('');


const _crInfo = (Results) => {
  const _info = _getResultsInfo(Results) || {};
  return {
    name: _crName(_info),
    description: _crDescr(_info)
  }
};

const _crDfLinkCondig = (
  ValueName,
  industryItem
) => ValueName === "Industry" && getFrequency(industryItem) === "Q"
  ? crDfLink(`BEA ${getCaption(industryItem)}`, `${INDUSTRY_FACTSHEET_URL}#${getValue(industryItem)}`)
  : void 0;

const _crZhConfig = ({
  ValueName,
  items,
  _itemKey,
  itemCaption,
  dataSource
}) => ({
   id: _itemKey,
   key: _itemKey,
   itemCaption,
   dataSource,
   ..._crDfLinkCondig(ValueName, items[0])
})

const MD = {
  DF: "-12-31",
  I: "-03-31",
  II: "-06-30",
  III: "-09-30"
};

const _crUTC = (item) => {
  const md = item.Frequency === "Q"
    ? MD[item.Quarter] || MD.DF
    : MD.DF;
  return ymdToUTC(item.Year + md);
};

export const crData = (
  json,
  option
) => {
  const Results = getResults(json)
  , {
    dfFilterName,
    items
  } = option
  , two = getValue(items[1])
  , isFilter = dfFilterName ? true : false;

  return  (getResultsData(Results) || [])
    .reduce((data, item) => {
       if (isObj(item)) {
         const v = parseFloat(item.DataValue)
         , dateMls =  _crUTC(item);
         if ( isNumber(dateMls) && !(isFilter && item[dfFilterName] !== two) ) {
           data.push({
             x: dateMls,
             y: isNaN(v) ? null : v
           })
         }
       }
       return data;
   }, []);
}

export const crConfOption = (
  option,
  json
) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(getResults(json))
})
