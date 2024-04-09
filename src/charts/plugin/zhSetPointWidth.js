import {
  tryUpdate,
  getSeriaType
} from './pluginFn';


const zhSetPointWidth = function(pointWidth) {
  tryUpdate(
    this,
    {
      plotOptions: {
        [getSeriaType(this)]: {
          pointWidth
        }
      }
    }
  )
}

export default zhSetPointWidth
