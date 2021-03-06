import { Component } from 'react';

import ScrollPane from '../zhn/ScrollPane';
import SeriaRow from './SeriaRow';

const CL = {
  ELL: 'ellipsis'
};

const S = {
  ROOT_DIV: {
    paddingTop: 8
  },
  TITLE: {
    paddingBottom: 4,
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    borderBottom: '2px solid black'
  },
  CHART_ID: {
    color: '#a487d4',
    width: 200,
    verticalAlign: 'bottom'
  }
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
  <div style={S.TITLE}>
    <span>From Chart:&nbsp;</span>
    <span
       className={CL.ELL}
       style={S.CHART_ID}
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

   compSeries = []

  _regSeriaRow = (comp) => {
    const compIndex = comp.props.compIndex;
    this.compSeries[compIndex] = comp
  }
  _unregSeriaRow = (comp) => {
    const compIndex = comp.props.compIndex;
    this.compSeries[compIndex] = null
  }

  render(){
    const { style, toChart, fromChart } = this.props
    , _yAxisOption = _crYAxisOption(toChart)
    , { userOptions, series } = fromChart || {}
    , { zhConfig } = userOptions || {}
    , { id:chartId='id' } = zhConfig || {};

    return (
      <ScrollPane style={{...style, ...S.ROOT_DIV}}>
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
    return this.compSeries
      .filter(comp => comp !== null )
      .map(comp => comp.getValue())
      .filter(config => config.isChecked)
      .map(config => {
        config.userMin = userMin
        config.userMax = userMax
        return config;
      });
  }
}

export default SeriesPane
