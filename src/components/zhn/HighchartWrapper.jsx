import Highcharts from 'highcharts';

import { isFn } from '../../utils/isTypeFn';

import {
  useRef,
  useLayoutEffect,
  IfTrue
} from '../uiApi';

const S_DIV = {
  position: 'relative',
  zIndex: 1
};

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
    if (_chartInstance && isFn(onLoaded)){
      onLoaded(_chartInstance);
    }

    return () => {
      if (isFn(onWillUnLoaded)){
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
      <IfTrue v={isShowAbs}>
        {absComp}
      </IfTrue>
    </div>
  );
}

export default HighchartWrapper
