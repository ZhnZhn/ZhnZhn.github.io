"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _reactDom = require("react-dom");

var _JsonStatFn = require("./JsonStatFn");

var _kMeans = _interopRequireDefault(require("../../math/k-means"));

var _mathFn = require("../../math/mathFn");

var _merge = _interopRequireDefault(require("../../utils/merge"));

var _MapFactory = require("../../components/factories/MapFactory");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const URL_EU_GEOJSON = 'data/geo/eu-stat.geo.json',
      NUMBER_OF_CLUSTERS = 6,
      NUMBER_OF_ITERATION = 100,
      COLORS = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];

const _isArr = Array.isArray,
      _assign = Object.assign,
      _crElement = tag => document.createElement(tag),
      _getElementById = id => document.getElementById(id),
      _crPromise = value => Promise.resolve(value);

const _findFeature = (features, id) => {
  if (!_isArr(features)) {
    return;
  }

  for (let i = 0; i < features.length; i++) {
    var _features$i;

    if ((features == null ? void 0 : (_features$i = features[i]) == null ? void 0 : _features$i.properties.id) === id) {
      return features[i];
    }
  }

  return;
};

const _mergeGeoAndValue = (sGeo, dGeo, json) => {
  const points = [];
  let minValue = Number.POSITIVE_INFINITY,
      maxValue = Number.NEGATIVE_INFINITY;
  sGeo.forEach((cell, index) => {
    const feature = _findFeature(json.features, dGeo.id[index]),
          {
      value,
      status
    } = cell;

    if (feature && value) {
      feature.properties.value = value;
      const point = [value, 0];
      point.status = status;
      point.id = feature.properties.id;
      points.push(point);

      if (minValue > value) {
        minValue = value;
      }

      if (maxValue < value) {
        maxValue = value;
      }
    }
  });

  if (points.length === 0) {
    const point = [0, 0];
    point.id = 'ID';
    points.push(point);
  }

  return {
    minValue,
    maxValue,
    points
  };
};

const _crHmIdCluster = clusters => {
  const hm = {};
  clusters.forEach((cluster, i) => {
    for (const point of cluster.points) {
      hm[point.id] = i;
    }
  });
  return hm;
};

const _mergeGeoJsonAndClusters = (geoJson, hmIdCluster, maxCluster) => {
  geoJson.features.forEach(feature => {
    const _properties = feature.properties,
          _id = _properties.id;

    if (_id) {
      const _cluster = hmIdCluster[_id];
      _properties.cluster = typeof _cluster !== "undefined" ? _cluster : maxCluster;
    } else {
      _properties.cluster = maxCluster;
    }
  });
};

const _crStyle = feature => ({
  "color": 'green',
  "fillColor": COLORS[feature.properties.cluster],
  "weight": 1,
  "fillOpacity": 0.7,
  "opacity": 0.65
});

const _crEl = function (tag, className, cssText, id) {
  if (className === void 0) {
    className = '';
  }

  if (cssText === void 0) {
    cssText = '';
  }

  const el = _crElement(tag);

  el.className = className;
  el.style.cssText = cssText;

  if (id) {
    el.id = id;
  }

  return el;
};

const _crInfoControl = (L, mapId) => _assign(L.control(), {
  onAdd(map) {
    this.idEl = mapId + '_info-control';
    this.divEl = _crEl('div', 'control-info', '', this.idEl);
    return this.divEl;
  },

  update(props) {
    if (props) {
      const elInfo = (0, _MapFactory.crInfo)(props);
      (0, _reactDom.render)(elInfo, _getElementById(this.idEl));
    }
  },

  updateCluster(cluster, color, from, to) {
    if (cluster) {
      const elClusterInfo = (0, _MapFactory.crClusterInfo)({
        cluster,
        color,
        from,
        to
      });
      (0, _reactDom.render)(elClusterInfo, _getElementById(this.idEl));
    }
  }

});

const _calcUpper = (clusters, index, maxValue) => {
  var _clusters$index$point, _clusters$index, _clusters$points;

  if (clusters.length - 1 === index) {
    return maxValue;
  }

  const arrL = (_clusters$index$point = clusters == null ? void 0 : (_clusters$index = clusters[index]) == null ? void 0 : _clusters$index.points) != null ? _clusters$index$point : [[0]],
        arrH = (_clusters$points = clusters == null ? void 0 : clusters[index + 1].points) != null ? _clusters$points : [[0]],
        upLow = arrL[arrL.length - 1][0],
        upUp = arrH[0] ? arrH[0][0] : upLow;
  return upLow + (upUp - upLow) / 2;
};

const _crRowEl = (color, from, to, cluster, wg) => {
  var _cluster$points$lengt, _cluster$points;

  const _n = (_cluster$points$lengt = cluster == null ? void 0 : (_cluster$points = cluster.points) == null ? void 0 : _cluster$points.length) != null ? _cluster$points$lengt : 0,
        el = _crEl('p', '', "opacity: 0.7; background: " + color + "; padding: 5px 6px; cursor: pointer;");

  el.addEventListener('click', function (event) {
    wg.updateCluster(cluster, color, from, to);
  });
  el.innerHTML = "<span>" + from + "&ndash;" + to + "<span>\n                  <span style=\"float: right; color: black; padding-left: 16px\">" + _n + "</span>";
  return el;
};

const _crFooterEl = () => {
  const el = _crEl('div');

  el.innerHTML = "<p style=\"opacity:0.65;background:green;padding: 3px 6px\">No Data</p>\n                  <p style=\"color:black;padding-top: 5px;\">Source: Eurostat</p>";
  return el;
};

const _crGradeControl = (minValue, maxValue, clusters, L, wg) => {
  const gradeContorl = L.control({
    position: 'bottomleft'
  });

  gradeContorl.onAdd = map => {
    const _div = _crEl('div', 'control-grade');

    let _upperPrev, _upperNext;

    _upperPrev = (0, _mathFn.toFixed)(minValue);
    clusters.forEach((cluster, index) => {
      _upperNext = (0, _mathFn.toFixed)(_calcUpper(clusters, index, maxValue));

      _div.appendChild(_crRowEl(COLORS[index], _upperPrev, _upperNext, cluster, wg));

      _upperPrev = _upperNext;
    });

    _div.appendChild(_crFooterEl());

    return _div;
  };

  return gradeContorl;
};

const _onMouseOver = (infoControl, e) => {
  const _layer = e.target;
  infoControl.update(_layer.feature.properties);
};
/*
const  _onMouseOut = function(infoControl, e){
  //infoControl.update()
}
*/


const _fnOnEachFeature = (infoControl, feature, layer) => {
  layer.on({
    mouseover: _onMouseOver.bind(null, infoControl) //mouseout: _onMouseOut.bind(null, infoControl)

  });
};

const _addGeoSeria = (points, statJson, configSlice) => {
  /* eslint-disable no-unused-vars */
  const {
    time,
    ...seriaSlice
  } = configSlice;
  /* eslint-enable no-unused-vars */

  return points.map(point => {
    seriaSlice.geo = point.id;
    point.seria = (0, _JsonStatFn.crGeoSeria)(statJson, seriaSlice);
    return point;
  });
};

const _crChoroplethMap = option => {
  const {
    jsonCube: statJson,
    geoJson,
    zhMapSlice: configSlice,
    map,
    L,
    mapId,
    time: dfTime
  } = option,
        {
    dGeo,
    sGeo,
    time
  } = (0, _JsonStatFn.createGeoSlice)(statJson, configSlice, dfTime),
        {
    minValue,
    maxValue,
    points
  } = _mergeGeoAndValue(sGeo, dGeo, geoJson),
        _points = _addGeoSeria(points, statJson, configSlice),
        _clusters = _kMeans.default.crUnarySortedCluster(_points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION),
        _hmIdCluster = _crHmIdCluster(_clusters);

  _mergeGeoJsonAndClusters(geoJson, _hmIdCluster, NUMBER_OF_CLUSTERS);

  const infoControl = _crInfoControl(L, mapId);

  infoControl.addTo(map);
  L.geoJSON(geoJson, {
    style: _crStyle,
    onEachFeature: _fnOnEachFeature.bind(null, infoControl)
  }).addTo(map);

  if (_points.length > 1) {
    const gradeControl = _crGradeControl(minValue, maxValue, _clusters, L, infoControl);

    gradeControl.addTo(map);
  }

  option.time = time;
  return option;
};

const _crGeoJson = geoJson => {
  const _geoJson = (0, _merge.default)(true, {}, geoJson);

  _geoJson.features.forEach(feature => {
    feature.properties.value = null;
  });

  return _geoJson;
};

const ChoroplethMap = {
  hmUrlGeoJson: {},
  L: void 0,
  mapOption: {
    doubleClickZoom: false,
    zoomSnap: 0.5,
    minZoom: 1,
    maxZoom: 4
  },

  getLeaflet() {
    if (this.L) {
      return _crPromise(this.L);
    } else {
      return Promise.resolve().then(() => _interopRequireWildcard(require('leaflet'))).then(L => {
        return this.L = L;
      });
    }
  },

  getGeoJson(url) {
    const geoJson = this.hmUrlGeoJson[url];

    if (geoJson) {
      return _crPromise(_crGeoJson(geoJson));
    } else {
      return fetch(url).then(response => response.json()).then(geoJson => this.hmUrlGeoJson[url] = geoJson);
    }
  },

  draw(options) {
    return this._loadCss().then(() => this._draw(options));
  },

  _loadCss() {
    return this._isCss ? _crPromise() : new Promise((resolve, reject) => {
      const _linkEl = _assign(_crElement("link"), {
        rel: "stylesheet",
        href: "css/leaflet.css",
        onload: () => {
          this._isCss = true;
          resolve();
        },
        onerror: () => {
          _linkEl.remove();

          reject();
        }
      }); // Insert it at the end of the head in a legacy-friendly manner


      const {
        head
      } = document,
            {
        childNodes
      } = head;
      head.insertBefore(_linkEl, childNodes[childNodes.length - 1].nextSibling);
    });
  },

  _draw(_ref) {
    let {
      id,
      jsonCube,
      zhMapSlice,
      time
    } = _ref;
    return this.getLeaflet().then(L => {
      const map = L.map(id, this.mapOption).setView([58.00, 10.00], 3);
      /*
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           id: 'addis',
           attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           errorTileUrl: ''
      }).addTo(map);
      */

      L.tileLayer('', {
        id: id + '_tile'
      }).addTo(map);
      return {
        jsonCube,
        zhMapSlice,
        time,
        L,
        map,
        mapId: id
      };
    }).then(option => {
      return this.getGeoJson(URL_EU_GEOJSON).then(geoJson => {
        option.geoJson = geoJson;
        return option;
      });
    }).then(option => _crPromise(_crChoroplethMap(option)));
  }

};
var _default = ChoroplethMap;
exports.default = _default;
//# sourceMappingURL=ChoroplethMap.js.map