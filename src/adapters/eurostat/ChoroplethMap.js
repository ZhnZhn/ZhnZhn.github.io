import { createRoot } from 'react-dom/client';

import { domSanitize } from '../../utils/domFn';
import { merge } from '../../utils/objFn';
import clusterMaker from '../../math/k-means';
import { toFixed } from '../../math/mathFn';

import {
  crInfo,
  crClusterInfo
} from '../../components/factories/MapFactory';

import {
  crGeoSlice,
  crGeoSeria
} from '../JsonStatTwoDimensionFn';

const URL_EU_GEOJSON = 'data/geo/eu-stat.geo.json'
, NUMBER_OF_CLUSTERS = 6
, NUMBER_OF_ITERATION = 100
, COLORS = [
   '#9ecae1', '#6baed6',
   '#4292c6', '#2171b5',
   '#08519c', '#08306b',
   '#74c476'
];

const _isArr = Array.isArray
, _assign = Object.assign
, _crElement = tag => document.createElement(tag)
, _getElementById = id => document.getElementById(id)
, _crPromise = value => Promise.resolve(value);

const _findFeature = (
  features,
  id
) => {
  if (!_isArr(features)) {
    return;
  }
  for(let i=0; i<features.length; i++){
    if (features?.[i]?.properties.id === id){
      return features[i];
    }
  }
};

const _mergeGeoAndValue = (
  sGeo,
  dGeo,
  json
) => {
  const points = [];
  let minValue = Number.POSITIVE_INFINITY
  , maxValue = Number.NEGATIVE_INFINITY;
  sGeo.forEach((cell, index) => {
    const feature = _findFeature(json.features, dGeo[index])
    , { value, status } = cell;
    if (feature && value){
      feature.properties.value = value;

      const point = [value, 0];
      point.status = status
      point.id = feature.properties.id;
      points.push(point);

      if (minValue>value) { minValue = value; }
      if (maxValue<value) { maxValue = value; }
    }
  })
  if (points.length === 0){
    const point = [0, 0];
    point.id = 'ID';
    points.push(point);
  }
  return {
    minValue,
    maxValue,
    points
  };
}

const _crHmIdCluster = (clusters) => {
  const hm = {};
  clusters.forEach((cluster, i) => {
    for (const point of cluster.points){
      hm[point.id] = i;
    }
  })
  return hm;
};

const _mergeGeoJsonAndClusters = (
  geoJson,
  hmIdCluster,
  maxCluster
) => {
  geoJson.features.forEach((feature) => {
    const _properties = feature.properties
    , _id = _properties.id;
    if (_id){
      const _cluster = hmIdCluster[_id];
      _properties.cluster = typeof _cluster === "undefined"
          ? maxCluster
          : _cluster;
    } else {
      _properties.cluster = maxCluster;
    }
  })
};


const _crStyle = (feature) => ({
  "color": 'green',
  "fillColor": COLORS[feature.properties.cluster],
  "weight": 1,
  "fillOpacity": 0.7,
  "opacity": 0.65
});

const _crEl = (
  tag,
  className='',
  cssText='',
  id
) => {
  const el = _crElement(tag);
  el.className = className
  el.style.cssText = cssText
  if (id) {
    el.id = id;
  }
  return el;
};

const _crInfoControl = (L, mapId) => _assign(L.control(), {
  onAdd(map){
    this.idEl = mapId + '_info-control'
    this.divEl = _crEl('div', 'control-info', '', this.idEl)
    return this.divEl;
  },
  _getRootInfo(){
    if (!this._rootInfo){
      this._rootInfo = createRoot(_getElementById(this.idEl))
    }
    return this._rootInfo;
  },
  renderElement(el){
    this._getRootInfo().render(el)
  },
  update(props){
    if (props){
      this.renderElement(crInfo(props))
    }
  },
  updateCluster(cluster, color, from, to){
    if (cluster){
      this.renderElement(crClusterInfo({ cluster, color, from, to }))
    }
  }
});


const _calcUpper = (
  clusters,
  index,
  maxValue
) => {
  if (clusters.length - 1 === index) {
    return maxValue;
  }
  const arrL = clusters?.[index]?.points ?? [[0]]
  , arrH = clusters?.[index+1].points ?? [[0]]
  , upLow = arrL[arrL.length-1][0]
  , upUp = arrH[0] ? arrH[0][0] : upLow;

  return (upLow + (upUp - upLow)/2);
}

const _crRowEl = (
  color,
  from,
  to,
  cluster,
  wg
) => {
  const _n = cluster?.points?.length ?? 0
  , el = _crEl('p', '',
     `opacity: 0.7; background: ${color}; padding: 5px 6px; cursor: pointer;`
   )
  el.addEventListener('click', function(event){
    wg.updateCluster(cluster, color, from, to)
  })
  el.innerHTML = `<span>${domSanitize(from)}&ndash;${domSanitize(to)}<span>
                  <span style="float: right; color: black; padding-left: 16px">${domSanitize(_n)}</span>`
  return el;
}
const _crFooterEl = () => {
  const el = _crEl('div');
  el.innerHTML = `<p style="opacity:0.65;background:green;padding: 3px 6px">No Data</p>
                  <p style="color:black;padding-top: 5px;">Source: Eurostat</p>`
  return el;
}

const _crGradeControl = (
  minValue,
  maxValue,
  clusters,
  L,
  wg
) => {
  const gradeContorl = L.control({ position: 'bottomleft' })
  gradeContorl.onAdd = (map) => {
     const _div = _crEl('div', 'control-grade');

     let _upperPrev, _upperNext;
     _upperPrev = toFixed(minValue)
     clusters.forEach((cluster, index) => {
       _upperNext = toFixed(_calcUpper(clusters, index, maxValue))
       _div.appendChild( _crRowEl(
           COLORS[index], _upperPrev, _upperNext, cluster, wg
       ))
       _upperPrev = _upperNext;
     })
     _div.appendChild(_crFooterEl())

     return _div;
  }

  return gradeContorl;
}

const _onMouseOver = (infoControl, e) => {
  const _layer = e.target;
  infoControl.update(_layer.feature.properties);
}
/*
const  _onMouseOut = function(infoControl, e){
  //infoControl.update()
}
*/
const _fnOnEachFeature = (
  infoControl,
  feature,
  layer
) => {
   layer.on({
     mouseover: _onMouseOver.bind(null, infoControl),
     //mouseout: _onMouseOut.bind(null, infoControl)
   })
}

const _addGeoSeria = (
  points,
  statJson,
  configSlice
) => points.map(point => {
  point.seria = crGeoSeria(statJson, point.id)
  return point;
});

const _crChoroplethMap = (option) => {
  const {
    jsonCube:statJson,
    geoJson,
    map,
    L,
    mapId,
    time
  } = option
  , [dGeo, sGeo] = crGeoSlice(statJson, time)
  , { minValue, maxValue, points } = _mergeGeoAndValue(sGeo, dGeo, geoJson)
  , _points = _addGeoSeria(points, statJson)
  , _clusters = clusterMaker.crUnarySortedCluster(_points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION)
  , _hmIdCluster = _crHmIdCluster(_clusters);

  _mergeGeoJsonAndClusters(geoJson, _hmIdCluster, NUMBER_OF_CLUSTERS);
  const infoControl = _crInfoControl(L, mapId);
  infoControl.addTo(map);

  L.geoJSON(geoJson, {
     style: _crStyle,
     onEachFeature: _fnOnEachFeature.bind(null, infoControl)
  }).addTo(map);

  if ( _points.length > 1) {
    const gradeControl = _crGradeControl(
      minValue, maxValue, _clusters, L, infoControl
    )
    gradeControl.addTo(map);
  }
  return option;
}

const _crGeoJson = (geoJson) => {
  const _geoJson = merge(true, {}, geoJson)
  _geoJson.features.forEach(feature => {
     feature.properties.value = null
  });
  return _geoJson;
}

const ChoroplethMap = {
  hmUrlGeoJson: {},
  L: void 0,
  mapOption: {
    doubleClickZoom: false,
    zoomSnap: 0.5,
    minZoom: 1,
    maxZoom: 4
  },

  getLeaflet(){
    if (this.L){
      return _crPromise(this.L);
    } else {
      return import(
        /* webpackChunkName: "leaflet" */
        /* webpackMode: "lazy" */
        'leaflet'
      ).then(L => {
        return this.L = L;
      });
    }
  },

  getGeoJson(url){
     const geoJson = this.hmUrlGeoJson[url];
     if (geoJson){
       return _crPromise(_crGeoJson(geoJson));
     } else {
       return fetch(url)
         .then(response => response.json())
         .then(geoJson => this.hmUrlGeoJson[url] = geoJson)
     }
  },


  draw(options){
    return this._loadCss()
      .then(() => this._draw(options));
  },

  _loadCss(){
    return this._isCss
      ? _crPromise()
      : new Promise((resolve, reject) => {
          const _linkEl = _assign(_crElement("link"), {
            rel: "stylesheet",
            href: "css/leaflet.css",
            onload: () => {
              this._isCss = true
              resolve()
            },
            onerror: () => {
              _linkEl.remove()
              reject()
            }
          })
          // Insert it at the end of the head in a legacy-friendly manner
          const { head } = document
          , { childNodes } = head;
          head.insertBefore(_linkEl, childNodes[childNodes.length - 1].nextSibling);
      })
  },

  _draw({ id, jsonCube, zhMapSlice, time }){
    return this.getLeaflet()
       .then( (L) => {
          const map = L.map(id, this.mapOption)
            .setView([58.00, 10.00], 3);

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
            jsonCube, zhMapSlice, time,
            L, map, mapId: id
          };
       })
       .then(option => {
          return this.getGeoJson(URL_EU_GEOJSON)
           .then(geoJson => {
              option.geoJson = geoJson;
              return option;
           });
       })
       .then(option => _crPromise(
         _crChoroplethMap(option)
       ));
  }
};

export default ChoroplethMap
