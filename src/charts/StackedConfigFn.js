import crStackedConfig from './crStackedConfig';

export const crStackedAreaConfig = crStackedConfig
export const crStackedColumnConfig =
  props => crStackedConfig({ ...props, type: 'column' })

export const crStackedAreaSeria = ({
  name,
  data=[],
  color='gray'
}) => ({
  name,
  data,
  color,
  fillColor: color,
  fillOpacity: 0.5,
  marker: {
    radius: 6,
    symbol: 'circle'
  }
})

export const crStackedColumnSeria = ({
  name,
  data=[],
  color='gray'
}) => ({
    name,
    data,
    color,
    fillColor: color,
    fillOpacity: 0.5,
    borderColor: 'transparent',
    borderWidth: 1,
    pointPadding: 0.01,
    marker: {
      radius: 6,
      symbol: 'circle'
    },
    dataLabels: {
      enabled: false,
      format: '{point.percent}',
      color: 'black',
      style: {
        textShadow: 'none'
      }
    },
    states: {
      hover: {
        enabled: true,
        borderColor: 'yellow'
      }
    }
})
