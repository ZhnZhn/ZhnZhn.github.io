import {
  //Component,
  forwardRef,
  useRef, useCallback, useImperativeHandle
} from 'react';

import ScrollPane from '../zhn/ScrollPane';
import SeriaRow from './SeriaRow';

const CL_ELL = 'ellipsis'
//, S_ROOT_DIV = { paddingTop: 8 }
, S_TITLE = {
  paddingBottom: 4,
  margin: '0 0 8px 16px',
  fontWeight: 'bold',
  borderBottom: '2px solid black'
}, S_CHART_ID = {
  color: '#a487d4',
  width: 200,
  verticalAlign: 'bottom'
};

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

const _getUserMinMax = fromChart => {
  const { xAxis } = fromChart || {}
  , [ xAxis0 ] = xAxis || []
  , {
    dataMin, dataMax,
    userMin, userMax
  } = (xAxis0 && xAxis0.getExtremes()) || {};
  return [
    userMin || dataMin,
    userMax || dataMax
  ];
};


const _crOptionItem = (caption, value) => ({
  caption,
  value
});

const _crYAxisOption = toChart => {
  const options = (toChart.yAxis || [])
   .map((yAxis, index) =>
     _crOptionItem(`toYAxis${index+1}`, index));
  options.unshift(_crOptionItem('withYAxis'))
  return options;
};

const PasteToTitle = ({ chartId }) => (
  <div style={S_TITLE}>
    <span>From Chart:&nbsp;</span>
    <span
       className={CL_ELL}
       style={S_CHART_ID}
    >
      {chartId}
    </span>
  </div>
);

const PasteToSeriaList = ({
  chartId,
  series,
  options,
  onReg,
  onUnReg
}) => (
  <div>
   {(series || [])
     .filter(seria => seria.visible)
     .map((seria, index) => {
     return (
        <SeriaRow
         key={`${chartId}_${seria.name || ''}_${index}`}
         seria={seria}
         compIndex={index}
         yAxisOptions={options}
         onReg={onReg}
         onUnReg={onUnReg}
      />
    );
   })}
 </div>
);

const _getRefValue = ref => ref.current;

const SeriesPane = forwardRef(({
  style,
  toChart,
  fromChart
}, ref) => {
  const _refSeries = useRef([])
  , _regSeriaRow = useCallback((ref, compIndex) => {
    _refSeries.current[compIndex] = ref
  }, [])
  , _unregSeriaRow = useCallback(compIndex => {
    _refSeries.current[compIndex] = null
  }, []);

  useImperativeHandle(ref, () => ({
     getValues: () => {
       const [userMin, userMax] = _getUserMinMax(fromChart);
       return _getRefValue(_refSeries)
         .filter(refRow => refRow !== null )
         .map(refRow => refRow.current.getValue())
         .filter(config => config.isChecked)
         .map(config => {
           config.userMin = userMin
           config.userMax = userMax
           return config;
         });
     }
  }), [fromChart])

  const  _yAxisOption = _crYAxisOption(toChart)
  , { userOptions, series } = fromChart || {}
  , { zhConfig } = userOptions || {}
  , { id='id' } = zhConfig || {};

  return (
    <ScrollPane style={style}>
       <PasteToTitle chartId={id} />
       <PasteToSeriaList
          chartId={id}
          series={series}
          options={_yAxisOption}
          onReg={_regSeriaRow}
          onUnReg={_unregSeriaRow}
       />
    </ScrollPane>
  );
});

export default SeriesPane
