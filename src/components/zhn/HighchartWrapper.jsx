import { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';

const S = {
  DIV: {
    position: 'relative',
    zIndex: 1
  },
  SHOW: {
    display: 'block',
  },
  HIDE: {
    display: 'none'
  }
};

const MSG_OFFLINE = 'It seems you are offline';

const _isFn = fn => typeof fn === 'function';

const _isAreaRangeRequired = config => {
  const { series } = config
  , { type } = (series || [])[0] || {}
  return type === 'arearange'
    && !Highcharts.seriesTypes.arearange;
};

const _loadHighchartsMore = () => {
  /*eslint-disable no-undef */
  if (process.env.NODE_ENV === '_development') {
     return import("lib-dev/highcharts-more.js");
    /*eslint-enable no-undef */
  }
  return import(
    /* webpackChunkName: "highcharts-more" */
    /* webpackMode: "lazy" */
    "highcharts/highcharts-more"
  );
};

const HighchartWrapper = ({
  isShow=true,
  isShowAbs=true,
  absComp=null,
  style,
  config,
  onLoaded,
  onWillUnLoaded
}) => {
  const _refChartNode = useRef()
  , _refChart = useRef();

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!config){
      throw new Error("Chart's config must be specified.");
    }
    const _crChart = () => {
       _refChart.current = new Highcharts.Chart(
         _refChartNode.current, config
       );
       const { current } = _refChart;
       if (current && _isFn(onLoaded)){
         onLoaded(current);
       }
    };

    if (_isAreaRangeRequired(config)) {
       _loadHighchartsMore()
         .then(module => module.default(Highcharts))
         .then(_crChart)
         .catch(err => console.log(MSG_OFFLINE));
    } else {
      _crChart()
    }

    return () => {
      const { current } = _refChart;
      if (_isFn(onWillUnLoaded)){
        onWillUnLoaded(current);
      }
      if (current) {
        current.destroy()
        _refChart.current = null
      }
    }
  }, [])
  /*eslint-enable react-hooks/exhaustive-deps */

  const _style = isShow ? S.SHOW : S.HIDE;
  return (
    <div style={{...style, ...S.DIV, ..._style}}>
      <div ref={_refChartNode} />
      {isShowAbs && absComp}
    </div>
  );
}

export default HighchartWrapper
