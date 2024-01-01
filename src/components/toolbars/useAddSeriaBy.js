import {
  useRef,
  useCallback,
  getRefValue,
  setRefValue
} from '../uiApi';
import { useBool } from '../hooks/useBool';

const _isNumber = n => typeof n === 'number'
, _isFn = fn => typeof fn === 'function';

const _crName = (
  prefixStr,
  nOrObj
) => {
  const _suffix = _isNumber(nOrObj)
    ? `(${nOrObj})`
    : '';
  return `${prefixStr}${_suffix}`;
};

const _isSeriaInst = (s) => s && _isFn(s.setVisible);

const _getSeriaIndex = (chart, { s }) => {
  const _index = _isNumber(s) ? s - 1 : 0;
  return chart?.series.length > _index
    ? _index
    : 0;
}

const useAddSeriaBy = (
  confArr,
  getChart
) => {
  const _refSeria = useRef()
  , [
    isSeria,
    showSeria,
    hideSeria
  ] = useBool()
  /*eslint-disable react-hooks/exhaustive-deps */
  , addSeriaBy = useCallback((...args) => {
    const [
      seriaOptions,
      fnOptions
    ] = args.length === 1
      ? [{}]
      : args
    , [
       seriaPropName,
       color,
       fn
    ] = confArr
    , name = _crName(seriaPropName, fnOptions);
    const _chart = getChart();
    if (_chart) {
      const _seria = getRefValue(_refSeria);
      if ( _isSeriaInst(_seria) ) {
        _seria.setVisible(true)
      } else {
        const seriaIndex = _getSeriaIndex(_chart, seriaOptions)
        , data = _chart.series[seriaIndex].data
        , seriaData = fn(data, fnOptions);
        setRefValue(
          _refSeria,
          _chart.zhAddSeriaToYAxis({
            data: seriaData,
            color: seriaOptions.color || color,
            name
          }, seriaOptions))
      }
      showSeria()
    }
  }, [getChart])
  // confArr, showSeria
  , hideSeriaBy = useCallback(() => {
    const isRemove = confArr[3]
    , _seria = getRefValue(_refSeria)
    if (_isSeriaInst(_seria)) {
      if (isRemove) {
        _seria.yAxis.remove()
        setRefValue(_refSeria, null)
      } else {
        _seria.setVisible(false)
      }
      hideSeria()
    }
  }, [])
  //confArr, hideSeria
  /*eslint-enable react-hooks/exhaustive-deps */

  return [
    isSeria,
    addSeriaBy,
    hideSeriaBy
  ];
}

export default useAddSeriaBy
