
import L from 'leaflet';
import JSONstat from 'jsonstat';

import clusterMaker from '../math/k-means';

const NUMBER_OF_CLUSTERS = 6
    , NUMBER_OF_ITERATION = 100
    , _clusterColors = [
'#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b',
'#74c476'
];

const _findFeature = function(arr, value){
  let i, len;
  for(i=0, len=arr.length; i<len; i++){
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
    const point = [ 0, 0];
    point.id = 'ID';
    points.push(point);
  }
  return { minValue, maxValue, points }
}

const _fnCreateClusters = function(points, n, iteration){
  clusterMaker.k(n);
  clusterMaker.iterations(iteration);
  clusterMaker.data(points);

  const _clusters = clusterMaker.clusters().sort( (a, b) => {
     if ( a.centroid[0] < b.centroid[0] ) { return -1;}
     if ( a.centroid[0] > b.centroid[0] ) { return 1;}
     if ( a.centroid[0] === b.centroid[0] ) { return 0;}
  })
  _clusters.forEach(( cluster ) => {
     cluster.points = cluster.points.sort((a, b) => {
       if ( a[0] < b[0] ) { return -1;}
       if ( a[0] > b[0] ) { return 1;}
       if ( a[0] === b[0] ) { return 0;}
     })
 });

  return _clusters;
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


const _fnCreateInfoControl = function(){
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

const _fnCreateGradeControl = function(minValue, maxValue, _clusters){
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


const EuroStatToMap = {
  createChoroplethMap(statJson, geoJson, configSlice, map){
    const  ds = JSONstat(statJson).Dataset(0)
         , dGeo = ds.Dimension("geo")
         , _dGeo = (dGeo) ? dGeo : []
         , sGeo = ds.Data(configSlice)
         , _sGeo = (sGeo) ? sGeo : []
         , { minValue, maxValue, points } = _fnMergeGeoAndValue(_sGeo, _dGeo, geoJson)
         , _clusters = _fnCreateClusters(points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION)
         , _hmIdCluster = _fnCreateHmIdCluster(_clusters);

    _fnMergeGeoJsonAndClusters(geoJson, _hmIdCluster, NUMBER_OF_CLUSTERS);

    const infoControl = _fnCreateInfoControl();
    infoControl.addTo(map);

    L.geoJSON(geoJson, {
       style : _fnStyle,
       onEachFeature : _fnOnEachFeature.bind(null, infoControl)
    }).addTo(map);


    if ( points.length > 1) {
      const gradeControl = _fnCreateGradeControl(minValue, maxValue, _clusters)
      gradeControl.addTo(map);
    }
  }
};

export default EuroStatToMap
