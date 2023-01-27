import pipe from '../../utils/pipe';
import {
  crBarOrColumnConfig,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';

const _assign = Object.assign;

const CHART_HEIGHT = {
  height: 600,
  marginTop: 75,
  marginBottom: 20
};

const BAR_CHART = {
  ...CHART_HEIGHT,
  type: 'bar',
};
const _crBarDataLabels = () => ({
  enabled: true,
  color: 'black',
  crop: false,
  overflow: 'allow',
  zIndex: 10,
  style: {
    fontSize: '14px'
  }
})

const SCATTER_CHART = {
  ...CHART_HEIGHT,
  type: 'scatter',
  inverted: true
};

const _crLegend = (
  y=10
) => ({
  y,
  x: 0,
  enabled: true,
  align: 'right',
  verticalAlign: 'top',
  layout: 'horizontal'
});

const PLOT_OPTIONS = {
  minPointLength: 5,
  pointPadding: 0,
  borderWidth: 0,
  groupPadding: 0.2,
  shadow: false
}
const _crPlotOptionsColumn = ({
  seriaColor
}) => ({
  column: {
    color: seriaColor,
    pointPlacement: 0,
    pointWidth: 6,
    ...PLOT_OPTIONS
  }
})
const _crPlotOptionsBar = ({
  seriaColor
}) => ({
  bar: {
    color: seriaColor,
    pointWidth: 4,
    ...PLOT_OPTIONS
  }
})

const _crBarYAxis = () => ({
  opposite: true,
  labels: { x: 3 }
})

const _crColumnConfig = option => pipe(
  crBarOrColumnConfig(),
  fAdd({
    legend: _crLegend(),
    plotOptions: _crPlotOptionsColumn(option)
  }),
  toConfig
);

const _crBarConfig = (option) => {
  const config = pipe(
    crBarOrColumnConfig('BAR'),
    fAdd({
      chart: {...BAR_CHART},
      yAxis: _crBarYAxis(),
      legend: _crLegend(28),
      plotOptions: _crPlotOptionsBar(option)
    }),
    toConfig
  );

  if (option.seriaType === 'BAR_WITH_LABELS') {
    config.plotOptions.bar.dataLabels = _crBarDataLabels()
  }
  return config;
};

const _crDotConfig = (option) => {
  const { seriaColor } = option;
  const config = pipe(
    crBarOrColumnConfig(),
    fAdd({
      chart: {...SCATTER_CHART},
      legend: _crLegend(28)
    }),
    toConfig
  );

  _assign(config.series[0], {
    color: seriaColor,
    marker: {
      symbol: 'circle',
      radius: 5
    }
  })
  return config;
};

const _r = {
  COLUMN_SET: _crColumnConfig,
  BAR_SET: _crBarConfig,
  BAR_WITH_LABELS: _crBarConfig,
  DOT_SET: _crDotConfig
};

const FactoryChart = {
  createConfig: (option) => {
    const { seriaType } = option || {}
    , _crConfig = seriaType && _r[seriaType];
    return _crConfig
      ? _crConfig(option)
      : {};
  }
};

export default FactoryChart
