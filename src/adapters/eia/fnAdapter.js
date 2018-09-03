import AdapterFn from '../AdapterFn'

const {
  crZhFn,
  valueMoving,
  findMaxY,
  findMinY
} = AdapterFn;

const C = {
  CHART_URL: "https://www.eia.gov/opendata/embed.php?type=chart&series_id="
};

const _toUTC = (str) => {
  if (str.length === 6) {
    const _year = str.substr(0, 4)
        , _month = parseInt(str.substr(4), 10)-1
        , _day = (_month === 1) ? 28 : 30;
    return Date.UTC(_year, _month, _day);
  }
};

const _crZhConfig = (json, option) => {
  const { dataSource } = option
  , id = json.series[0].series_id;
  return {
    id, key: id,
    //itemCaption: title,
    isWithoutAdd: true,
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
  <p><a href="${C.CHART_URL}${series_id}" style="padding-top: 4px;">EIA Chart</a></p>`;
};

const _crInfo = (json) => {
  const _s = json.series[0]
  return {
    name: _s.name,
    description: _crDescr(_s)
  };
}

const fnAdapter = {
  /*
  [ ["201806", 1000], ... ]
  */
  crData(json) {
    return json.series[0].data.map(arr => ({
      x: _toUTC(arr[0]),
      y: arr[1]
    }))
    .reverse();
  },
  findMaxY: findMaxY,
  findMinY: findMinY,

  crConfigOption: ({ json, option, data }) => ({
    zhConfig: _crZhConfig(json, option),
    valueMoving: valueMoving(data),
    info: _crInfo(json),
    ...crZhFn()
  })
}

export default fnAdapter
