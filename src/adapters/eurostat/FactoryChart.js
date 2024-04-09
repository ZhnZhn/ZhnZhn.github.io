import pipe from '../../utils/pipe';
import { crCategoryDataLabels } from '../../charts/Chart';
import {
  crBarOrColumnConfig,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';
import {
  CHT_COLUMN_SET,
  CHT_BAR_SET,
  CHT_BAR_WITH_LABELS,
  CHT_DOT_SET
} from '../../constants/ChartType';

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

  if (option.seriaType === CHT_BAR_WITH_LABELS) {
    config.plotOptions.bar.dataLabels = crCategoryDataLabels(true)
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
  [CHT_COLUMN_SET]: _crColumnConfig,
  [CHT_BAR_SET]: _crBarConfig,
  [CHT_BAR_WITH_LABELS]: _crBarConfig,
  [CHT_DOT_SET]: _crDotConfig
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
