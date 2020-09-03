import crStackedConfig from './crStackedConfig'

const WithStackAreaConfig = {
  crStackedAreaConfig: (props) => crStackedConfig(props),
  crStackedAreaSeria: ({name, data=[], color='gray'}) => ({
    name: name,
    data: data,
    color: color,
    fillColor: color,
    fillOpacity: 0.5,
    marker: {
      radius: 6,
      symbol: 'circle'
    }
  })
}

export default WithStackAreaConfig
