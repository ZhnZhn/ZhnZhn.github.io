import { Component } from 'react';

import ScrollPane from '../zhn/ScrollPane';
import SeriaRow from './SeriaRow';

const CL_ELL = 'ellipsis'

, S_ROOT_DIV = { paddingTop: 8 }
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


const _crYAxisOption = (toChart) => {
  const options = [{
    caption: 'withYAxis',
    value: void 0
  }];
  toChart.yAxis.forEach((yAxis, index) => {
    options.push ({
      caption: `toYAxis${index+1}`,
      value: index
    })
  })
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
  chartId, series, options,
  onReg, onUnReg
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

class SeriesPane extends Component {

   _refSeries = []

  _regSeriaRow = (ref, compIndex) => {
     this._refSeries[compIndex] = ref
  }
  _unregSeriaRow = (compIndex) => {
     this._refSeries[compIndex] = null
  }

  render(){
    const { style, toChart, fromChart } = this.props
    , _yAxisOption = _crYAxisOption(toChart)
    , { userOptions, series } = fromChart || {}
    , { zhConfig } = userOptions || {}
    , { id:chartId='id' } = zhConfig || {};

    return (
      <ScrollPane style={{...style, ...S_ROOT_DIV}}>
         <PasteToTitle chartId={chartId} />
         <PasteToSeriaList
            chartId={chartId}
            series={series}
            options={_yAxisOption}
            onReg={this._regSeriaRow}
            onUnReg={this._unregSeriaRow}
         />
      </ScrollPane>
    );
  }

  getValues(){
    const [
      userMin, userMax
    ] = _getUserMinMax(this.props.fromChart);
    return this._refSeries
      .filter(ref => ref !== null )
      .map(ref => ref.current.getValue())
      .filter(config => config.isChecked)
      .map(config => {
        config.userMin = userMin
        config.userMax = userMax
        return config;
      });
  }
}

export default SeriesPane
