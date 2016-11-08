'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _jsonstat = require('jsonstat');

var _jsonstat2 = _interopRequireDefault(_jsonstat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAP_COLOR_NUMBER = 6;

var _findFeature = function _findFeature(arr, value) {
  for (var i = 0, len = arr.length; i < len; i++) {
    var feature = arr[i];
    if (feature.properties.id === value) {
      return feature;
    }
  }
  return undefined;
};

var _fnMergeGeoAndValue = function _fnMergeGeoAndValue(sGeo, dGeo, json) {
  var minValue = 100,
      maxValue = 0;
  sGeo.forEach(function (cell, index) {
    var feature = _findFeature(json.features, dGeo.id[index]);
    if (feature && cell.value) {
      feature.properties.value = cell.value;
      if (minValue > cell.value) {
        minValue = cell.value;
      }
      if (maxValue < cell.value) {
        maxValue = cell.value;
      }
    }
  });
  return { minValue: minValue, maxValue: maxValue };
};

var _calcColor = function _calcColor(minValue, delta, value) {
  if (!value) {
    return '#74c476';
  } else {
    return value < minValue + 1 * delta ? '#9ecae1' : value < minValue + 2 * delta ? '#6baed6' : value < minValue + 3 * delta ? '#4292c6' : value < minValue + 4 * delta ? '#2171b5' : value < minValue + 5 * delta ? '#08519c' : '#08306b';
  }
};

var _fnStyle = function _fnStyle(minValue, delta, feature) {
  return {
    "color": 'green',
    "fillColor": _calcColor(minValue, delta, feature.properties.value),
    "weight": 1,
    "fillOpacity": 0.7,
    "opacity": 0.65
  };
};

var _fnCreateInfoControl = function _fnCreateInfoControl() {
  var wgInfo = _leaflet2.default.control();
  wgInfo.onAdd = function (map) {
    this._div = _leaflet2.default.DomUtil.create('div', 'control-info');
    this.update();
    return this._div;
  };
  wgInfo.update = function (props) {
    if (props) {
      var label = props.label;
      var value = props.value;


      this._div.innerHTML = '<b>' + label + '</b><br><b>' + (value ? value : 'uknown') + '</b>';
    }
  };
  return wgInfo;
};

var _fnCreateGradeControl = function _fnCreateGradeControl(minValue, delta) {
  var gradeContorl = _leaflet2.default.control({ position: 'bottomleft' });
  gradeContorl.onAdd = function (map) {
    var _div = _leaflet2.default.DomUtil.create('div', 'control-grade');
    for (var i = 1; i < MAP_COLOR_NUMBER + 1; i++) {
      _div.innerHTML += '<i style="background:' + _calcColor(minValue, delta, minValue + delta * i - 0.1) + '";' + '</i>' + Math.floor(minValue + delta * (i - 1)) + '&ndash;' + Math.round(minValue + delta * i) + '<br>';
    }
    return _div;
  };
  return gradeContorl;
};

var EuroStatToMap = {
  createCholoplethMap: function createCholoplethMap(statJson, geoJson, configSlice, map) {
    var ds = (0, _jsonstat2.default)(statJson).Dataset(0);
    var dGeo = ds.Dimension("geo");
    var sGeo = ds.Data(configSlice);

    var _fnMergeGeoAndValue2 = _fnMergeGeoAndValue(sGeo, dGeo, geoJson);

    var minValue = _fnMergeGeoAndValue2.minValue;
    var maxValue = _fnMergeGeoAndValue2.maxValue;
    var delta = (maxValue - minValue) / MAP_COLOR_NUMBER;

    var wgInfo = _fnCreateInfoControl();
    wgInfo.addTo(map);

    var _fnOnMouseOver = function _fnOnMouseOver(e) {
      var _layer = e.target;
      wgInfo.update(_layer.feature.properties);
    };
    var _fnOnMouseOut = function _fnOnMouseOut(e) {
      wgInfo.update();
    };
    var _fnOnEachFeature = function _fnOnEachFeature(feature, layer) {
      layer.on({
        mouseover: _fnOnMouseOver,
        mouseout: _fnOnMouseOut
      });
    };

    _leaflet2.default.geoJSON(geoJson, {
      style: _fnStyle.bind(null, minValue, delta),
      onEachFeature: _fnOnEachFeature
    }).addTo(map);

    var gradeContorl = _fnCreateGradeControl(minValue, delta);
    gradeContorl.addTo(map);
  }
};

exports.default = EuroStatToMap;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\EuroStatToMap.js.map