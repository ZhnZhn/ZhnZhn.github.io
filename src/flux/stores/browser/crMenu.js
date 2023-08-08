import { atom } from '../../storeApi';

import {
  ComponentActions
} from '../../actions/ComponentActions';
import {
  CHAT_SHOW,
  ChartActions
} from '../../actions/ChartActions';

const _isArr = Array.isArray
, _isBool = v => typeof v === 'boolean'
, _getBoolProperty = property => _isBool(property)
   ? property
   : void 0;

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
  atomBadge: atom({ is: false, value: 0 }),  
  ..._crItemHandlers(id, browserType)
})


const _crItems = (
  items=[],
  menuItems,
  browserType
) => items.map(item => item.id
  ? _crItem(item, menuItems, browserType)
  : {
    isInitOpen: _getBoolProperty(item.isInitOpen),
    caption: item.caption,
    items: _crItems(item.items, menuItems, browserType)
  }
);

const crMenu = (
  menu=[],
  menuItems,
  browserType
) => menu
 .map(menuPart => _isArr(menuPart.items)
    ? {
        caption: menuPart.caption,
        isInitOpen: _getBoolProperty(menuPart.isInitOpen),
        items: _crItems(
          menuPart.items,
          menuItems,
          browserType
        )
      }
   : _crItem(menuPart, menuItems, browserType)
);

export default crMenu
