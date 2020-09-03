import crStackedConfig from './crStackedConfig'

const WithStackedColumnConfig = {
 crStackedColumnConfig: props => crStackedConfig({ ...props, type: 'column' }),
 crStackedColumnSeria: ({ name, data=[], color='gray' }) => ({
     name: name,
     data: data,
     borderColor: 'transparent',
     borderWidth: 1,
     color: color,
     fillColor: color,
     fillOpacity: 0.5,
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
}

export default WithStackedColumnConfig
