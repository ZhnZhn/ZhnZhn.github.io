import {
  useRef,
  useLayoutEffect
} from '../uiApi';
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
  const _refChartElement = useRef();

  /*eslint-disable react-hooks/exhaustive-deps */
  useLayoutEffect(() => {
    if (!config){
      throw new Error("Chart's config must be specified.");
    }

    const _chartInstance = new Highcharts.Chart(
      _refChartElement.current,
      config
    );
    if (_chartInstance && _isFn(onLoaded)){
      onLoaded(_chartInstance);
    }

    return () => {
      if (_isFn(onWillUnLoaded)){
        onWillUnLoaded(_chartInstance);
      }
      if (_chartInstance) {
        _chartInstance.destroy()
      }
    }
  }, [])
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <div style={S_DIV}>
      <div ref={_refChartElement} />
      {isShowAbs && absComp}
    </div>
  );
}

export default HighchartWrapper
