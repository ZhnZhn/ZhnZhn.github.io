
const DATA_LABELS = {
  enabled: true,
  color: 'black',
  crop: false,
  overflow: 'allow',
  style: {
    fontSize: 14
  }
};

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
            ...DATA_LABELS
          }
        }
      }
    })
  } catch(err) {
    console.log(err)
  }
};


export default zhEnableDataLabels
