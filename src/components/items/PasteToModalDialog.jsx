import {
  useRef,
  useCallback,
  useMemo
} from '../uiApi';
import memoIsShow from '../hoc/memoIsShow';
import useProperty from '../hooks/useProperty';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import FlatButton from '../zhn-m/FlatButton';

import SeriesPane from './SeriesPane';
const S_MODAL = {
  position: 'static',
  width: 365,
  height: 340,
  margin: '70px auto 0px'
}, S_SERIES_PANE = {
  overflowY: 'auto',
  height: 250,
  padding: '8px 10px 0 0'
};

const DF_DATA = {};

const _usePasteTo = (
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
    const _toChart = getToChart();
    if (_toChart) {
      _refCompSeries.current
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
      isPrimary={true}
      onClick={_hPasteTo}
    />), [_hPasteTo]);

  return [
    getToChart(),
    _refCompSeries,
    _commandButtons
  ];
};

const PasteToModalDialog = memoIsShow(({
  isShow,
  data=DF_DATA,
  onClose
}) => {
  const [
    toChart,
    refCompSeries,
    commandButtons
  ] = _usePasteTo(data, onClose)
  , { fromChart } = data;

  return (
    <ModalDialog
      isShow={isShow}
      style={S_MODAL}
      caption="Paste Series To"
      commandButtons={commandButtons}
      onClose={onClose}
    >
      <SeriesPane
         ref={refCompSeries}
         style={S_SERIES_PANE}
         fromChart={fromChart}
         toChart={toChart}
      />
    </ModalDialog>
  );
})

export default PasteToModalDialog
