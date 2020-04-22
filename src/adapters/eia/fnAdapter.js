import AdapterFn from '../AdapterFn'

const {
  valueMoving
} = AdapterFn;

const C = {
  CHART_URL: "https://www.eia.gov/opendata/embed.php?type=chart&series_id="
};

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

const _getCaption = (obj) => {
  return obj && obj.caption
    ? obj.caption
    : '';
};

const fnAdapter = {
  /*
  [ ["201806", 1000], ... ]
  */
  crTitle: (option) => {
    const {
      items=[],
      dfTitle
    } = option
    , _s1 = _getCaption(items[0])
    , _s2 = _getCaption(items[1])
    , _s3 = _getCaption(items[2])
    , _subtitle = `${_s2}${_s3 ? ':' : ''} ${_s3}`;

    return {
      title: `${_s1}: ${dfTitle}`,
      subtitle: _subtitle
    };
  },
  crData(json) {
    return json.series[0].data.map(arr => ({
      x: _toUTC(arr[0]),
      y: arr[1]
    }))
    .reverse();
  },

  crConfigOption: ({ json, option, data }) => ({
    zhConfig: _crZhConfig(json, option),
    valueMoving: valueMoving(data),
    info: _crInfo(json)
  })
}

export default fnAdapter
