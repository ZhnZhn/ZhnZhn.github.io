import { render } from 'react-dom'
//import merge from 'lodash.merge'

import JsonStatFn from './JsonStatFn'
import clusterMaker from '../../math/k-means'
import mathFn from '../../math/mathFn'
import safeGet from '../../utils/safeGet'
import merge from '../../utils/merge'

import MapFactory from '../../components/factories/MapFactory'

/*eslint-disable no-undef */
if ( process.env.NODE_ENV !== 'development'){
  if (window.System && window.System.config) {
    window.System.config({
      baseURL: "/"
    });
  }
}
/*eslint-enable no-undef */

const URL_LEAFLET = 'lib/leaflet.js'
    , URL_EU_GEOJSON = 'data/geo/eu-stat.geo.json'
    , NUMBER_OF_CLUSTERS = 6
    , NUMBER_OF_ITERATION = 100
    , COLORS = [
          '#9ecae1', '#6baed6',
          '#4292c6', '#2171b5',
          '#08519c', '#08306b',
          '#74c476'
      ];

const _findFeature = function(arr=[], value){
  let i=0, len=arr.length;
  for(; i<len; i++){
     const feature = arr[i]
     if (feature.properties.id === value){
       return feature;
     }
  }
  return undefined;
};


const _fnMergeGeoAndValue = function(sGeo, dGeo, json){
  const points = [];
  let minValue = Number.POSITIVE_INFINITY
    , maxValue = Number.NEGATIVE_INFINITY;
  sGeo.forEach((cell, index) => {
    const feature = _findFeature(json.features, dGeo.id[index])
        , value = cell.value;
    if (feature && value){
      feature.properties.value = value;

      const point = [ value, 0 ];
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
  return { minValue, maxValue, points };
}

const _fnCreateHmIdCluster = function(clusters){
  const hm = {};
  clusters.forEach((cluster, i) => {
    for (const point of cluster.points){
      hm[point.id] = i;
    }
  })
  return hm;
};

const _fnMergeGeoJsonAndClusters = function(geoJson, hmIdCluster, maxCluster){
  geoJson.features.forEach((feature ) => {
    const _properties = feature.properties
        , _id = _properties.id
    if (_id){
      const _cluster = hmIdCluster[_id];
      _properties.cluster = (typeof _cluster !== "undefined")
             ? _cluster
             : maxCluster;
    } else {
      _properties.cluster = maxCluster;
    }
  })
};


const _fnStyle = function(feature){
  return {
    "color" : 'green',
    "fillColor" : COLORS[feature.properties.cluster],
    "weight": 1,
    "fillOpacity": 0.7,
    "opacity": 0.65
  }
}

const _fnCreateEl = function(tag, className='', cssText='', id){
  const el = document.createElement(tag)
  el.className = className
  el.style.cssText = cssText
  if (id) {
    el.id = id;
  }
  return el;
}


const _fnCreateInfoControl = function(L, mapId){
  const wgInfo = L.control();
  wgInfo.onAdd = function(map){
    this.idEl = mapId + '_info-control'
    this.divEl = _fnCreateEl('div', 'control-info', '', this.idEl)
    return this.divEl;
  }
  wgInfo.update = function(props){
    if (props){
      const elInfo = MapFactory.crInfo(props);
      render(elInfo, document.getElementById(this.idEl))
    }
  }
  wgInfo.updateCluster = function(cluster, color, from, to){
    if (cluster){
      const elClusterInfo = MapFactory.crClusterInfo({ cluster, color, from, to });
      render(elClusterInfo, document.getElementById(this.idEl))
    }
  }
  return wgInfo;
}

const _fnCalcUpper = function(clusters, index, maxValue){
  if (clusters.length - 1 === index) {
    return maxValue;
  }
  const arrL = safeGet(clusters, `[${index}].points`, [[0]])
      , arrH = safeGet(clusters, `[${index+1}].points`, [[0]])
      , upLow = arrL[arrL.length-1][0]
      , upUp = ( arrH[0] ) ? arrH[0][0] : upLow;

  return (upLow + (upUp - upLow)/2);
}

const _fnCreateRowEl = function(color, from, to, cluster, wg){
  const _n = safeGet(cluster, `points.length`, 0)
  const el = _fnCreateEl(
     'p', '',
     `opacity: 0.7; background: ${color}; padding: 5px 6px; cursor: pointer;`
   )
  el.addEventListener('click', function(event){
    wg.updateCluster(cluster, color, from, to)
  })
  el.innerHTML = `<span>${from}&ndash;${to}<span>
                  <span style="float: right; color: black; padding-left: 16px">${_n}</span>`
  return el;
}
const _fnCreateFooterEl = function(){
  const el = _fnCreateEl('div');
  el.innerHTML = `<p style="opacity:0.65;background:green;padding: 3px 6px">No Data</p>
                  <p style="color:black;padding-top: 5px;">Source: Eurostat</p>`
  return el;
}

const _fnCreateGradeControl = function(minValue, maxValue, clusters, L, wg){
  const gradeContorl = L.control({ position: 'bottomleft' })
  gradeContorl.onAdd = function(map){
      const _div = _fnCreateEl('div', 'control-grade');

      let _upperPrev, _upperNext;
      _upperPrev = mathFn.toFixed(minValue)
      clusters.forEach((cluster, index) => {
        _upperNext = mathFn.toFixed(_fnCalcUpper(clusters, index, maxValue))
        _div.appendChild( _fnCreateRowEl(
            COLORS[index], _upperPrev, _upperNext, cluster, wg
        ))
        _upperPrev = _upperNext;
      })
      _div.appendChild(_fnCreateFooterEl())

      return _div;
    }

  return gradeContorl;
}

const _fnOnMouseOver = function(infoControl, e){
  const _layer = e.target;
  infoControl.update(_layer.feature.properties);
}
const  _fnOnMouseOut = function(infoControl, e){
  //infoControl.update()
}
const _fnOnEachFeature = function(infoControl, feature, layer){
   layer.on({
     mouseover : _fnOnMouseOver.bind(null, infoControl),
     mouseout : _fnOnMouseOut.bind(null, infoControl)
   })
}

const _fnAddGeoSeria = (points, statJson, configSlice) => {
  /* eslint-disable no-unused-vars */
  const { time, ...seriaSlice } = configSlice;
  /* eslint-enable no-unused-vars */
  return points.map(point => {
    seriaSlice.geo = point.id
    point.seria = JsonStatFn.crGeoSeria(statJson, seriaSlice)
    return point;
  });
}

const _createChoroplethMap = function(option){
  const { jsonCube:statJson, geoJson, zhMapSlice:configSlice, map, L, mapId } = option
       , { dGeo, sGeo, time } = JsonStatFn.createGeoSlice(statJson, configSlice)
       , { minValue, maxValue, points } = _fnMergeGeoAndValue(sGeo, dGeo, geoJson)
       , _points = _fnAddGeoSeria(points, statJson, configSlice)
       , _clusters = clusterMaker.crUnarySortedCluster(_points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION)
       , _hmIdCluster = _fnCreateHmIdCluster(_clusters);

  _fnMergeGeoJsonAndClusters(geoJson, _hmIdCluster, NUMBER_OF_CLUSTERS);
  const infoControl = _fnCreateInfoControl(L, mapId);
  infoControl.addTo(map);

  L.geoJSON(geoJson, {
     style : _fnStyle,
     onEachFeature : _fnOnEachFeature.bind(null, infoControl)
  }).addTo(map);


  if ( _points.length > 1) {
    const gradeControl = _fnCreateGradeControl(
      minValue, maxValue, _clusters, L, infoControl
    )
    gradeControl.addTo(map);
  }

  option.time = time
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
  hmUrlGeoJson : {},
  L : undefined,
  mapOption: {
    doubleClickZoom: false
  },

  getLeaflet(){
    if (this.L){
      return Promise.resolve(this.L);
    } else {
      return window.System.import(URL_LEAFLET)
                .then( L => { return this.L = L; })
    }
  },

  getGeoJson(url){
     const geoJson = this.hmUrlGeoJson[url];
     if (geoJson){
       return Promise.resolve(_crGeoJson(geoJson));
     } else {
       return fetch(url)
         .then(response => response.json())
         .then(geoJson => this.hmUrlGeoJson[url] = geoJson)
     }
  },

  draw(id, jsonCube, zhMapSlice){
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
                     //id: 'addis',
                     id: id + '_tile'
                }).addTo(map);

                return { jsonCube, zhMapSlice, L, map, mapId: id };
             })
             .then ( (option) => {
                 return this.getGeoJson(URL_EU_GEOJSON)
                           .then( (geoJson) => {
                              option.geoJson = geoJson;
                              return option;
                           });
            })
            .then( (option) => {
                return Promise.resolve(_createChoroplethMap(option));
            });
  }
};

export default ChoroplethMap
