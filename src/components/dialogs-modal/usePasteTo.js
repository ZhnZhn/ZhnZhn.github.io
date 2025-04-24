import {
  useRef,
  useMemo,
  getRefValue
} from '../uiApi';

import { useProperty } from '../hooks/useProperty';
import FlatButton from '../zhn-m/FlatButton';

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
  , _hPasteTo = useMemo(() => () => {
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
  /*eslint-enable react-hooks/exhaustive-deps */
  , _commandButtons = useMemo(() => (<FlatButton
      key="paste"
      caption="Paste & Close"    
      onClick={_hPasteTo}
    />), [_hPasteTo]);

  return [
    getToChart(),
    _refCompSeries,
    _commandButtons
  ];
};

export default usePasteTo
