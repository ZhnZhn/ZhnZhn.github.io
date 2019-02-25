import CA from '../../actions/ComponentActions';
import CHA from '../../actions/ChartActions';

const _crItemHandlers = (dT, bT) => ({
  onClick: CA.showDialog.bind(null, dT, bT),
  onBadgeClick: CHA.showChart.bind(null, dT, bT),
  onBadgeClose: CA.closeChartContainer2.bind(null, dT)
});

const crMenu = (menu=[], menuItems, browserType) => {
  return menu.map(menuPart => {
     const { caption, isInitOpen, items=[] } = menuPart
     , _items = items.map(item => {
          const { id, isNew=false } = item;
          return {
            id: id,
            title: menuItems[id].menuTitle,
            isNew: isNew,
            counter: 0,
            isOpen: false,
            ..._crItemHandlers(id, browserType)
          };
     });
     return {
        caption, isInitOpen,
        items: _items
     };
  })
};

export default crMenu
