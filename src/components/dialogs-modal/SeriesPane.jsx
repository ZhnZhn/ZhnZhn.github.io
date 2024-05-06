import {
  useRef,
  useMemo,
  useImperativeHandle,
  getRefValue,
  getInputValue
} from '../uiApi';

import ScrollPane from '../zhn/ScrollPane';
import PasteToTitle from './PasteToTitle';
import PasteToSeriaList from './PasteToSeriaList';

import {
  getUserMinMax,
  crYAxisOptions
} from './SeriesPaneFn';

/*
const DF_FROM_CHART = {
  userOptions: {
    zhConfig: {
      id: 'id'
    }
  },
  series: []
};
*/

const SeriesPane = ({
  refEl,
  style,
  toChart,
  fromChart
}) => {
  const _refSeries = useRef([])
  , [
    _regSeriaRow,
    _unregSeriaRow
  ] = useMemo(() => [
    (ref, compIndex) => {
      _refSeries.current[compIndex] = ref
    },
    (compIndex) => {
      _refSeries.current[compIndex] = null
    }
  ], []);

  useImperativeHandle(refEl, () => ({
     getValues: () => {
       const [
         userMin,
         userMax
       ] = getUserMinMax(fromChart);
       return getRefValue(_refSeries)
         .map(refRow => getInputValue(refRow))
         .filter(config => config && config.isChecked)
         .map(config => {
           config.userMin = userMin
           config.userMax = userMax
           return config;
         });
     }
  }), [fromChart])

  const  _yAxisOptions = crYAxisOptions(toChart)
  , {
    userOptions,
    series
  } = fromChart || {}
  , { zhConfig } = userOptions || {}
  , { id='id' } = zhConfig || {};

  return (
    <ScrollPane style={style}>
       <PasteToTitle chartId={id} />
       <PasteToSeriaList
          chartId={id}
          series={series}
          options={_yAxisOptions}
          onReg={_regSeriaRow}
          onUnReg={_unregSeriaRow}
       />
    </ScrollPane>
  );
};

export default SeriesPane
