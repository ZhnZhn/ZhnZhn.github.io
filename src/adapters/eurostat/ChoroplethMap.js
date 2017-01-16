import JsonStatFn from './JsonStatFn';
import clusterMaker from '../../math/k-means';

/*eslint-disable no-undef */
if ( process.env.NODE_ENV !== 'development'){
  System.config({
    baseURL: "/"
  });
}
/*eslint-enable no-undef */

const URL_LEAFLET = 'lib/leaflet.js'
    , URL_EU_GEOJSON = 'data/geo/eu-stat.geo.json'
    , NUMBER_OF_CLUSTERS = 6
    , NUMBER_OF_ITERATION = 100
    , _clusterColors = [
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
    const feature = _findFeature(json.features, dGeo.id[index]);
    if (feature && cell.value){
      feature.properties.value = cell.value;

      const point = [ cell.value, 0];
      point.id = feature.properties.id;
      points.push(point);

      if (minValue>cell.value) { minValue = cell.value; }
      if (maxValue<cell.value) { maxValue = cell.value; }
    }
  })
  if (points.length === 0){
    const point = [0, 0];
    point.id = 'ID';
    points.push(point);
  }
  return { minValue, maxValue, points };
}

const _fnCreateClusters = function(points, n, iteration){
  clusterMaker.k(n);
  clusterMaker.iterations(iteration);
  clusterMaker.data(points);
  return clusterMaker.unarySortedClusters();
};

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
    "fillColor" : _clusterColors[feature.properties.cluster],
    "weight": 1,
    "fillOpacity": 0.7,
    "opacity": 0.65
  }
}


const _fnCreateInfoControl = function(L){
  const wgInfo = L.control();
  wgInfo.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'control-info');
    this.update();
    return this._div;
  }
  wgInfo.update = function(props){
    if (props){
      const { label, value } = props

      this._div.innerHTML = `<b>${label}</b><br><b>${value ? value : 'uknown'}</b>`
    }
  }
  return wgInfo;
}

const _fnCalcUpper = function(_clusters, index){
  const _arrL = _clusters[index].points
      , _arrH = _clusters[index+1].points
      , _upLow = _arrL[_arrL.length-1][0]
      , _upUp = ( _arrH[0] )
           ? _arrH[0][0]
           : _upLow;

  return (_upLow + (_upUp - _upLow)/2);
}

const _fnCreateItemInnerHtml = function(color, from, to){
  return `<i style="opacity:0.7;background:${color};">${from}&ndash;${to}</i><br/>`;
}

const _fnCreateGradeControl = function(minValue, maxValue, _clusters, L){
  const gradeContorl = L.control({ position: 'bottomleft' })
  gradeContorl.onAdd = function(map){
      const _div = L.DomUtil.create('div', 'control-grade');

      let _upperPrev = Math.round(_fnCalcUpper(_clusters, 0));
      _div.innerHTML = _fnCreateItemInnerHtml(_clusterColors[0], Math.floor(minValue), _upperPrev);

      let i, _upperNext;
      for(i=1; i<NUMBER_OF_CLUSTERS-1; i++){
        _upperNext = Math.round(_fnCalcUpper(_clusters, i));
        _div.innerHTML += _fnCreateItemInnerHtml(_clusterColors[i], _upperPrev, _upperNext);
        _upperPrev = _upperNext;
      }
      _div.innerHTML += _fnCreateItemInnerHtml(_clusterColors[NUMBER_OF_CLUSTERS-1], _upperPrev, Math.round(maxValue));

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

const _createChoroplethMap = function(option){
  const { jsonCube:statJson, geoJson, zhMapSlice:configSlice, map, L } = option
       , { dGeo, sGeo } = JsonStatFn.createGeoSlice(statJson, configSlice)
       , { minValue, maxValue, points } = _fnMergeGeoAndValue(sGeo, dGeo, geoJson)
       , _clusters = _fnCreateClusters(points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION)
       , _hmIdCluster = _fnCreateHmIdCluster(_clusters);

  _fnMergeGeoJsonAndClusters(geoJson, _hmIdCluster, NUMBER_OF_CLUSTERS);

  const infoControl = _fnCreateInfoControl(L);
  infoControl.addTo(map);

  L.geoJSON(geoJson, {
     style : _fnStyle,
     onEachFeature : _fnOnEachFeature.bind(null, infoControl)
  }).addTo(map);


  if ( points.length > 1) {
    const gradeControl = _fnCreateGradeControl(minValue, maxValue, _clusters, L)
    gradeControl.addTo(map);
  }

  return option;
}

const ChoroplethMap = {
  hmUrlGeoJson : {},
  L : undefined,

  getLeaflet(){
    if (this.L){
      return Promise.resolve(this.L);
    } else {
      return System.import(URL_LEAFLET)
                .then( L => { return this.L = L; })
    }
  },

  getGeoJson(url){
     const geoJson = this.hmUrlGeoJson[url]
     if (geoJson){
       return Promise.resolve(geoJson);
     } else {
       return fetch(url)
               .then( (response) => { return response.json(); })
               .then( (geoJson ) => { return this.hmUrlGeoJson[url] = geoJson; })
     }
  },

  draw(id, jsonCube, zhMapSlice){
    return this.getLeaflet()
             .then( (L) => {
                const map = L.map(id).setView([58.00, 10.00], 3);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                     id: 'addis',
                     attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
                return { jsonCube, zhMapSlice, L, map };
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
