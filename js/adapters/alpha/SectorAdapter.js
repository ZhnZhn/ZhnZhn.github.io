"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  PN_RT: 'Rank A: Real-Time Performance',
  PN_MD: 'Meta Data',
  PN_LR: 'Last Refreshed',
  TITLE: 'S&P 500 Sector Performances',
  ID: 'alp_perf',
  DATA_SOURCE: 'Alpha Vantage'
};
var S = {
  DS: {
    paddingTop: 6
  }
};
var M_PERIOD = [{
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
}];
var Y_PERIOD = [{
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
}];

var _isInArray = function _isInArray(arr, value) {
  if (arr === void 0) {
    arr = [];
  }

  var max = arr.length;
  var i = 0;

  for (; i < max; i++) {
    if (value.indexOf(arr[i].t) !== -1) {
      return arr[i].r;
    }
  }

  return false;
};

var _initRows = function _initRows(sectors) {
  return sectors.map(function (str) {
    return {
      id: str,
      Sector: str
    };
  });
};

var _addToRows = function _addToRows(rows, obj, pn) {
  rows.forEach(function (r) {
    r[pn] = parseFloat(obj[r.Sector]);
  });
};

var _crConfig = function _crConfig(json) {
  var forSectors = json[C.PN_RT],
      sectors = Object.keys(forSectors),
      slices = Object.keys(json),
      mRows = _initRows(sectors),
      yRows = _initRows(sectors);

  slices.forEach(function (k) {
    var mPropName = _isInArray(M_PERIOD, k);

    if (mPropName) {
      _addToRows(mRows, json[k], mPropName);
    }

    var yPropName = _isInArray(Y_PERIOD, k);

    if (yPropName) {
      _addToRows(yRows, json[k], yPropName);
    }
  });
  return {
    mRows: mRows,
    yRows: yRows
  };
};

var M_HEADERS = [{
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
var Y_HEADERS = [{
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

var _crTitle = function _crTitle(json) {
  var md = json[C.PN_MD] || {},
      lr = md[C.PN_LR] || '';
  return C.TITLE + " " + lr;
};

var SectorAdapter = {
  crKey: function crKey() {
    return C.ID;
  },
  toConfig: function toConfig(json, option) {
    var id = C.ID,
        _crConfig2 = _crConfig(json),
        mRows = _crConfig2.mRows,
        yRows = _crConfig2.yRows,
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
        dataSource: C.DATA_SOURCE,
        dsStyle: S.DS
      },
      y: {
        id: id + "_y",
        title: C.TITLE + " Yearly",
        headers: Y_HEADERS,
        rows: yRows,
        dataSource: C.DATA_SOURCE,
        dsStyle: S.DS
      }
    };

    return {
      config: config
    };
  }
};
var _default = SectorAdapter;
exports["default"] = _default;
//# sourceMappingURL=SectorAdapter.js.map