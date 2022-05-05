"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _crFn = require("../crFn");

var _fnDescr = _interopRequireDefault(require("./fnDescr"));

const _isArr = Array.isArray;
const C = {
  DATASET_EMPTY: 'Dataset is empty',
  ENPTY: '',
  BLANK: ' ',
  MM_DD: '-12-31',
  DF_TITLE: 'More about data on tab Info in Description'
};

const _crUnit = json => {
  const {
    data
  } = json,
        item = data[data.length - 1] || {},
        _unit = item.Unit === undefined ? C.DATASET_EMPTY : item.Unit || C.BLANK;

  return (0, _AdapterFn.toUpperCaseFirst)(_unit);
};

const _crPoint = _ref => {
  let {
    Year,
    Months,
    Value
  } = _ref;
  const m = Months ? (0, _AdapterFn.monthIndex)(Months) + 1 : 0,
        Tail = m !== 0 ? "-" + m : C.MM_DD;
  return {
    x: (0, _AdapterFn.ymdToUTC)('' + Year + Tail),
    y: Value
  };
};

const _crHm = (json, prName) => {
  const hm = Object.create(null);
  json.data.forEach(item => {
    const _itemKey = item[prName];

    if (!hm[_itemKey]) {
      hm[_itemKey] = [];
      hm[_itemKey].seriaName = _itemKey;
    }

    hm[_itemKey].push(_crPoint(item));
    /*
     const { Area } = item
     if (!hm[Area]) {
       hm[Area] = []
       hm[Area].seriaName = Area
     }
     hm[Area].push(_crPoint(item))
     */

  });
  return hm;
};

const _compareByY = (a, b) => b.y - a.y;

const _crRefLegend = hm => {
  const legend = [];
  let propName;

  for (propName in hm) {
    const _arr = hm[propName];
    legend.push({ ..._arr[_arr.length - 1],
      //Area: propName
      listPn: propName
    });
  }

  return legend.filter(_AdapterFn.isYNumber).sort(_compareByY);
};

const _hmToPoints = (hm, arr) => arr.map(item => hm[item.listPn]); //.map(item => hm[item.Area]);


const _crSeriesData = (json, prName) => {
  const _hm = _crHm(json, prName),
        _legend = _crRefLegend(_hm);

  return _hmToPoints(_hm, _legend);
};

const _isValueNumber = item => typeof item.Value === 'number';

const _compareByX = (a, b) => a.x - b.x;

const _crSeriaData = (json, option) => {
  return (0, _AdapterFn.mapIf)(json.data, _crPoint, _isValueNumber).sort(_compareByX);
};

const _isItemList = item => (0, _AdapterFn.getValue)(item).indexOf('>') !== -1;

const _getSeriesPropName = _ref2 => {
  let {
    items
  } = _ref2;

  if (_isItemList(items[0])) {
    return 'Area';
  }

  if (_isItemList(items[1])) {
    return 'Item';
  }
};

const _isListForList = _ref3 => {
  let {
    items
  } = _ref3;
  return _isItemList(items[0]) && _isItemList(items[1]);
};

const fnAdapter = {
  crError: _crFn.crError,
  getValue: _AdapterFn.getValue,
  findMinY: _AdapterFn.findMinY,
  crId: _ref4 => {
    let {
      _itemKey
    } = _ref4;
    return _itemKey;
  },
  crTitle: (json, option) => {
    const {
      title,
      dfTitle,
      dfSubtitle,
      subtitle
    } = option;

    if (dfSubtitle) {
      return subtitle + " " + _crUnit(json) + ": " + title;
    }

    if (title) {
      return dfTitle ? dfTitle + ": " + title : title;
    }

    const {
      data
    } = json,
          p = data[data.length - 1];

    if (p && typeof p === 'object') {
      const {
        Area = '',
        Item = '',
        Element = ''
      } = p;
      return Area + " " + Item + " " + Element;
    } else {
      return C.DF_TITLE;
    }
  },
  crSubtitle: (json, option) => {
    const {
      dfSubtitle,
      subtitle
    } = option;
    return dfSubtitle ? dfSubtitle : subtitle + ": " + _crUnit(json);
  },
  crSeriaData: _crSeriaData,
  toDataPoints: (json, option) => {
    const _prName = _getSeriesPropName(option);

    return _prName ? _crSeriesData(json, _prName) : _crSeriaData(json, option);
  },
  toInfo: _fnDescr.default.toInfo,
  crZhConfig: (id, _ref5) => {
    let {
      dfDomain,
      itemCaption
    } = _ref5;
    return {
      id: id,
      key: id,
      isWithoutSma: true,
      dataSource: "FAOSTAT",
      linkFn: "FAO_STAT",
      item: dfDomain,
      itemCaption: itemCaption
    };
  },
  crValueMoving: points => {
    return _isArr(points) && !_isArr(points[0]) ? (0, _AdapterFn.valueMoving)(points) : void 0;
  },
  isSeriesReq: _getSeriesPropName,
  isQueryAllowed: _isListForList
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map