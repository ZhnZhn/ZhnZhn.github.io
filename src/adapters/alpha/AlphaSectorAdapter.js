
const _objToArrItems = (obj) => {
  const keys = Object.keys(obj).sort();
  const arr = [];
  keys.forEach(key => {
    arr.push({
      caption: key,
      value: obj[key]
    })
  })
  return arr;
}

const AlphaSectorAdapter = {
  toConfig(json, option) {
    const _dataKeys = Object.keys(json).sort()
        , ranks = [];
    _dataKeys.forEach(key => {
      if (key !== "Meta Data") {
        const _arr = key.split(":")
            , _key = _arr[1]
                 ? _arr[1]
                 : 'Empty Name';
        ranks.push({
          caption: _key,
          items: _objToArrItems(json[key])
        })
      }
    })

    const config = {
      ranks: ranks,
      zhCompType: "SECTOR",
      zhConfig: {
        dataSource: "Alpha",
        id: "SECTOR_ID",
        isWithLegend: false,
        key: "SECTOR_ID"
      }
    }
    return { config };
  },

  toSeries(json, option) {
    throw new Error('ZH_1000');
  }
}

export default AlphaSectorAdapter
