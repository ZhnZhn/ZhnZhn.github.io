import ComponentActions from '../flux/actions/ComponentActions';
import ChartActions from '../flux/actions/ChartActions';

const fnClick = function(dialogType, browserType){
  return ComponentActions.showDialog.bind(null, dialogType, browserType);
}

const fnBadgeClick = function(dialogType, browserType){
  return ChartActions.showChart.bind(null, dialogType, browserType);
}
const fnBadgeClose = function(chartType){
  return ComponentActions.closeChartContainer2.bind(null, chartType);
}


const fnCreateMenu = function(menu=[], data, browserType){
  return menu.map((menuPart) => {
     const { caption, isInitOpen, items=[] } = menuPart
         , _items = items.map((item, index) =>{
               const { id, isNew=false } = item
               return {
                  id: id,
                  title: data[id].menuTitle,
                  isNew : isNew,
                  counter: 0,
                  isOpen: false,
                  onClick: fnClick(id, browserType),
                  onBadgeClick: fnBadgeClick(id, browserType),
                  onBadgeClose : fnBadgeClose(id)
               }
     });
     return {
        caption: caption,
        isInitOpen: isInitOpen,
        items: _items
     }
  })
};

const BrowserMenu = {
  createMenu: fnCreateMenu
};

export default BrowserMenu
