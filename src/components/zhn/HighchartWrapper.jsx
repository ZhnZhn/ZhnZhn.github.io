import { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';

const S_DIV = {
  position: 'relative',
  zIndex: 1
};

const _isFn = fn => typeof fn === 'function';

const HighchartWrapper = ({
  isShowAbs=true,
  absComp=null,
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

    _refChart.current = new Highcharts.Chart(
      _refChartNode.current, config
    );
    const { current } = _refChart;
    if (current && _isFn(onLoaded)){
      onLoaded(current);
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

  return (
    <div style={S_DIV}>
      <div ref={_refChartNode} />
      {isShowAbs && absComp}
    </div>
  );
}

export default HighchartWrapper
