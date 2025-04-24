import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

import { useProperty } from '../hooks/useProperty';
import useCommandButtons from '../zhn-moleculs/useCommandButtons';

const usePasteTo = (
  data,
  onClose
) => {
  const [
    setToChart,
    getToChart
  ] = useProperty();
  setToChart(data.toChart)

  const _refCompSeries = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hPasteTo = useCallback(() => {
    const _toChart = getToChart()
    , _seriesInst = getRefValue(_refCompSeries);
    if (_toChart && _seriesInst) {
      _seriesInst
        .getValues()
        .forEach(conf => {
          //color, data, name, userMin, userMax, yIndex
          _toChart.zhAddSeriaToYAxis(conf)
        })
    }
    onClose()
  }, [])
  //getToChart, onClose
  , _commandButtons = useCommandButtons(() => [
    ["Paste & Close", _hPasteTo]
  ]);

  return [
    getToChart(),
    _refCompSeries,
    _commandButtons
  ];
};

export default usePasteTo
