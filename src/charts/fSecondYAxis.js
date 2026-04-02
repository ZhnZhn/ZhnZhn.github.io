import { YAXIS_CONFIG } from './chartConfigs';

const fSecondYAxis = (
  name,
  color
) => ({
   //crosshair : fCrosshair(),
   ...YAXIS_CONFIG,
   id: name,
   lineColor: color,
   tickColor: color,
   gridLineWidth: 0,
   lineWidth: 2,
   labels: {
     style: {
       color: color,
       fontWeight: "bold",
       fontSize: "15px"
     }
   }
})

export default fSecondYAxis
