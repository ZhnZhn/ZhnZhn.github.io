"use strict";

exports.__esModule = true;
exports.default = void 0;
const PN_RT = 'Rank A: Real-Time Performance',
  PN_MD = 'Meta Data',
  PN_LR = 'Last Refreshed',
  TITLE = 'S&P 500 Sector Performances',
  ID = 'alp_perf',
  DATA_SOURCE = 'Alpha Vantage',
  S_DS = {
    paddingTop: 6
  },
  M_PERIOD = [{
    t: 'Real-Time',
    r: 'RT'
  }, {
    t: '1 Day',
    r: '1D'
  }, {
    t: '5 Day',
    r: '5D'
  }, {
    t: '1 Month',
    r: '1M'
  }, {
    t: '3 Month',
    r: '3M'
  }, {
    t: 'YTD',
    r: 'YTD'
  }, {
    t: '1 Year',
    r: '1Y'
  }],
  Y_PERIOD = [{
    t: '1 Year',
    r: '1Y'
  }, {
    t: '3 Year',
    r: '3Y'
  }, {
    t: '5 Year',
    r: '5Y'
  }, {
    t: '10 Year',
    r: '10Y'
  }],
  _getObjectKeys = Object.keys;
const _isInArray = function (arr, value) {
  if (arr === void 0) {
    arr = [];
  }
  const max = arr.length;
  let i = 0;
  for (; i < max; i++) {
    if (value.indexOf(arr[i].t) !== -1) {
      return arr[i].r;
    }
  }
  return false;
};
const _initRows = sectors => sectors.map(str => ({
  id: str,
  Sector: str
}));
const _addToRows = (rows, obj, pn) => {
  rows.forEach(r => {
    r[pn] = parseFloat(obj[r.Sector]);
  });
};
const _crConfig = json => {
  const forSectors = json[PN_RT],
    sectors = _getObjectKeys(forSectors),
    slices = _getObjectKeys(json),
    mRows = _initRows(sectors),
    yRows = _initRows(sectors);
  slices.forEach(k => {
    const mPropName = _isInArray(M_PERIOD, k);
    if (mPropName) {
      _addToRows(mRows, json[k], mPropName);
    }
    const yPropName = _isInArray(Y_PERIOD, k);
    if (yPropName) {
      _addToRows(yRows, json[k], yPropName);
    }
  });
  return {
    mRows,
    yRows
  };
};
const M_HEADERS = [{
  name: 'Sector',
  pn: 'Sector',
  style: {
    fontWeight: 'bold'
  }
}, {
  name: 'RT',
  pn: 'RT',
  isR: true
}, {
  name: '1D',
  pn: '1D',
  isR: true
}, {
  name: '5D',
  pn: '5D',
  isR: true
}, {
  name: '1M',
  pn: '1M',
  isR: true
}, {
  name: '3M',
  pn: '3M',
  isR: true
}, {
  name: 'YTD',
  pn: 'YTD',
  isR: true
}, {
  name: '1Y',
  pn: '1Y',
  isR: true
}];
const Y_HEADERS = [{
  name: 'Sector',
  pn: 'Sector',
  style: {
    fontWeight: 'bold'
  }
}, {
  name: '1Y',
  pn: '1Y',
  isR: true
}, {
  name: '3Y',
  pn: '3Y',
  isR: true
}, {
  name: '5Y',
  pn: '5Y',
  isR: true
}, {
  name: '10Y',
  pn: '10Y',
  isR: true
}];
const _crTitle = json => {
  const md = json[PN_MD] || {},
    lr = md[PN_LR] || '';
  return TITLE + " " + lr;
};
const SectorAdapter = {
  crKey() {
    return ID;
  },
  toConfig(json, option) {
    const id = ID,
      {
        mRows,
        yRows
      } = _crConfig(json),
      config = {
        id: id,
        zhCompType: 'ALPHA_PERF',
        zhConfig: {
          id: id,
          key: id
        },
        m: {
          id: id + "_m",
          title: _crTitle(json),
          headers: M_HEADERS,
          rows: mRows,
          dataSource: DATA_SOURCE,
          dsStyle: S_DS
        },
        y: {
          id: id + "_y",
          title: TITLE + " Yearly",
          headers: Y_HEADERS,
          rows: yRows,
          dataSource: DATA_SOURCE,
          dsStyle: S_DS
        }
      };
    return {
      config
    };
  }
};
var _default = SectorAdapter;
exports.default = _default;
//# sourceMappingURL=SectorAdapter.js.map