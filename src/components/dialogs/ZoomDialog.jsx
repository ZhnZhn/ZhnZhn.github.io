import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useEventCallback from '../hooks/useEventCallback';

import { isFn } from '../../utils/isTypeFn';
import {
  isDmy,
  dmyToUTC,
  isDmyPeriod,
  mlsToDmy,
  addToDmy,
  getYTDfromDmy
} from '../../utils/dateFn';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import useCommandButtons from '../zhn-moleculs/useCommandButtons';

import InputPeriod from './rows/InputPeriod';
import ZoomDailyRow from './ZoomDailyRow';

const S_DIALOG = {
  width: 244,
  marginLeft: -122
}
, S_DATE = { width: 120 };


const _getFromToDates = (chart) => chart
  .zhGetFromToDates?.({ format: mlsToDmy })
  ?? {};

const _getMinYear = (strDmy) => strDmy.split('-')[2];
const _crErrMsg = minYear => `DD-MM-YYYY format must be, min 01-01-${minYear}`;

const _crOnTestDate = from => {
  const _minYear = _getMinYear(from);
  return [
   //onTestDate
    (str) => isDmy(str, _minYear),
   // errMsgDateFrom
   _crErrMsg(_minYear)
  ];
};

const DF_DATA = {};

/*eslint-disable react-hooks/exhaustive-deps */
const useZoom = (
  getChart,
  refDates
) => {
  const _hZoom = useCallback(()=>{
    const [
      chart,
      onClose
    ] = getChart()
    , _datesInst = getRefValue(refDates);
    if ( isFn(chart.zhZoomX)
         && _datesInst.getValidation().isValid ) {
      const {
        fromDate,
        toDate
      } = _datesInst.getValues()
      chart.zhZoomX({
        from: dmyToUTC(fromDate),
        to: dmyToUTC(toDate)
      })
    }
    onClose()
  }, [])
  // getChart, refDates
  , _commandButtons = useCommandButtons(() => [
    ["Zoom", _hZoom]
  ]);

  return [
    _hZoom,
    _commandButtons
  ];
}
/*eslint-enable react-hooks/exhaustive-deps */

/*eslint-disable react-hooks/exhaustive-deps */
const useZoomBy = (
  getChart,
  refDates,
  month
) => useCallback(() => {
    const [ chart ] = getChart();
    if (isFn(chart.zhZoomX)) {
      const { to } = _getFromToDates(chart)
      , _fromMls = month
          ? addToDmy(to, month).getTime()
          : getYTDfromDmy(to)
      , _toMls = dmyToUTC(to);
      if (chart.zhZoomX({
        from: _fromMls,
        to: _toMls
      })) {
       getRefValue(refDates)
         .setFromTo(mlsToDmy(_fromMls), to)
      }
    }
}, []);
//getChart, refDates, month
/*eslint-enable react-hooks/exhaustive-deps */

const ZoomDialog = memoIsShow(({
  isShow,
  data=DF_DATA,
  onClose
}) => {
  const _refDates = useRef()
  , _getChart = useEventCallback(() => {
    const { chart={} } = data;
    return [chart, onClose];
  })

  , [_hZoom, _commandButtons]  = useZoom(_getChart, _refDates)
  , _hZoom1M = useZoomBy(_getChart, _refDates, -1)
  , _hZoom3M = useZoomBy(_getChart, _refDates, -3)
  , _hZoom6M = useZoomBy(_getChart, _refDates, -6)
  , _hZoom1Y = useZoomBy(_getChart, _refDates, -12)
  , _hZoomYTD = useZoomBy(_getChart, _refDates)

  , { chart={} } = data
  , { from, to } = _getFromToDates(chart)
  , [
    _onTestDate,
    _errMsgDateFrom
  ] = _crOnTestDate(from)
  , id = chart.zhGetId?.()
  , _isDaily = chart.zhIsDaily?.();

  return (
    <ModalDialog
      caption="Zoom Chart"
      style={S_DIALOG}
      isShow={isShow}
      commandButtons={_commandButtons}
      onClose={onClose}
    >
      <InputPeriod
         key={id}
         refEl={_refDates}
         dateStyle={S_DATE}
         placeholder="DD-MM-YYYY"
         initFromDate={from}
         initToDate={to}
         errMsg={_errMsgDateFrom}
         isPeriodValid={isDmyPeriod}
         onTestDate={_onTestDate}
         onEnter={_hZoom}
      />
      { _isDaily && <ZoomDailyRow
           onZoom1M={_hZoom1M}
           onZoom3M={_hZoom3M}
           onZoom6M={_hZoom6M}
           onZoomYTD={_hZoomYTD}
           onZoom1Y={_hZoom1Y}
        />
      }
    </ModalDialog>
  );
})

export default ZoomDialog
