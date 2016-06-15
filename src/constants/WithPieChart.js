
import Chart from './Chart';
import Tooltip from './Tooltip';

const WithPieChart = {

 fBasePieConfig(){
   return {
     zhSeries : {
       count : 0
     },
     zhDetailCharts : []  ,

     title : Chart.fTitle(),
     subtitle : Chart.fSubtitle(),
     legend : {
       //floating: true,
       //y : 300,
       itemStyle : {
         color: 'black',
         cursor: 'pointer',
         fontSize: '16px',
         fontWeight: 'normal'
       }
     }
   }
},

fInnerPieSeria({center, year, bTotal}){
   return {
      type : 'pie',
      borderColor: 'transparent',
      colors : ['transparent'],
      center  : center,
      //size : '60%',
      size : 250*0.6,
      startAngle: -90,
      endAngle: 90,
      data : [
      {
       name: `<span style="color:#A487D4;">${year}</span><br/>${bTotal.toString()}`,
       y: 1
      }
     ],
     dataLabels : {
       enabled : true,
       distance : -70,
       style : {
         fontWeight: 'bold',
         fontSize: '18px',
         color: 'black',
         textShadow: 'none;'
       }
     }
   }
 },

 fOuterPieSeria({
   zhSeriaId, center, data,
   isDataLabels=false, isShowInLegend=false
 }){
  return {
     zhSeriaId : zhSeriaId,
     type : 'pie',
     colorByPoint : true,
     allowPointSelect: true,
     borderColor : null,
     center : center,

     //size : '100%',
     size : 250,
     //innerSize : '60%',
     innerSize : 250*0.6,
     startAngle: -90,
     endAngle: 90,
     showInLegend : isShowInLegend,
     data : data,
     dataLabels : {
       enabled : isDataLabels,
       distance : -5
     },
     tooltip : {
       pointFormatter : Tooltip.fnPiePointFormatter,
       headerFormat : ''
     }
  }
}

}

export default WithPieChart
