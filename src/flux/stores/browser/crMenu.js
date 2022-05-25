import {
  ComponentActions
} from '../../actions/ComponentActions';
import ChartActions, { CHAT_SHOW } from '../../actions/ChartActions';

const _crItemHandlers = (
  dT,
  bT
) => ({
  onClick: ComponentActions.showDialog.bind(null, dT, bT),
  onBadgeClick: ChartActions[CHAT_SHOW].bind(null, dT, bT),
  onBadgeClose: ComponentActions.closeChartContainer2.bind(null, dT)
});

const _crItem = (
  { id, isNew=false },
  menuItems,
  browserType
) => ({
  id,
  title: menuItems[id].menuTitle,
  isNew: isNew,
  isOpen: false,
  counter: 0,
  ..._crItemHandlers(id, browserType)
})


const _crItems = (
  items=[],
  menuItems,
  browserType
) => items.map(item => item.id
  ? _crItem(item, menuItems, browserType)
  : {
    caption: item.caption,
    items: _crItems(item.items, menuItems, browserType)
  }
);

const crMenu = (
  menu=[],
  menuItems,
  browserType
) => menu.map(menuPart => {
   const {
     caption,
     isInitOpen,
     items
   } = menuPart
   , _items = _crItems(items, menuItems, browserType)
   return {
     caption,
     isInitOpen,
     items: _items
   };
})

export default crMenu
