import { getColorBlack } from '../ChartFn';

const _crDataLabelsConfig = () => ({
  enabled: true,
  color: getColorBlack(),
  crop: false,
  overflow: 'allow',
  style: {
    fontSize: 14
  }
})

const  zhEnableDataLabels = function(
  seriaType='columnrange',
  options
) {
  try {
    this.update({
      plotOptions: {
        [seriaType]: {
          dataLabels: {
            ...options,
            ..._crDataLabelsConfig()
          }
        }
      }
    })
  } catch(err) {
    console.log(err)
  }
};


export default zhEnableDataLabels
