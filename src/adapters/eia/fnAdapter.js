import { getCaption } from '../AdapterFn';
import { CL_PT_4 } from '../CL';

const CHART_URL = "https://www.eia.gov/opendata/embed.php?type=chart&series_id=";

const _toUTC = (str) => {
  if (str.length === 6) {
    const _year = str.substring(0, 4)
    , _month = parseInt(str.substring(4), 10)-1
    , _day = (_month === 1) ? 28 : 30;
    return Date.UTC(_year, _month, _day);
  }
  if (str.length === 4) {
    return Date.UTC(str, 11, 31);
  }
};

const _crZhConfig = (json, option) => {
  const { dataSource, key } = option
  , id = json.series[0].series_id;
  return {
    id, key,
    //itemCaption: title,
    dataSource
  };
};

const _crDescr = (s) => {
  const {
    description='',
    units='',
    source='',
    series_id='',
    updated
  } = s;
  return `<p>${description}</p>
  <p>Units: ${units}</p>
  <p>Source: ${source}</p>
  <p>Updated: ${updated ? updated.replace('T', ' '): ''}</p>
  <p>Id: ${series_id}</p>
  <p><a href="${CHART_URL}${series_id}" class="${CL_PT_4}">EIA Chart</a></p>`;
};

const _crInfo = (json) => {
  const _s = json.series[0]
  return {
    name: _s.name,
    description: _crDescr(_s)
  };
}

/* [ ["201806", 1000], ... ] */
export const crTitle = ({
  items=[],
  dfTitle
}) => {
  const _s1 = getCaption(items[0])
  , _s2 = getCaption(items[1])
  , _s3 = getCaption(items[2])
  , _subtitle = `${_s2}${_s3 ? ':' : ''} ${_s3}`;

  return {
    title: `${_s1}: ${dfTitle}`,
    subtitle: _subtitle
  };
}

export const crData = (
  json
) => json.series[0].data
   .map(arr => ({
      x: _toUTC(arr[0]),
      y: arr[1]
   }))
   .reverse();

export const crConfOption = (
  option,
  json
) => ({
  zhConfig: _crZhConfig(json, option),
  info: _crInfo(json)
})
