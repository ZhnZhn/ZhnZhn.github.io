import React from 'react';

import ComponentActions from '../../flux/actions/ComponentActions';
import { ModalDialog, CompItemType } from '../../constants/Type';

import AreaChartItem from '../items/AreaChartItem';
import MapChartItem from '../items/MapChartItem';

const _createAreaChartItem = function(config, index, option, props){
  const { zhConfig } = config
     ,  { id, key } = zhConfig
     ,  { chartType } = option
  return (
       <AreaChartItem
           ref={'chart' + index}
           key={key}
           chartType={chartType}
           caption={id}
           config={config}
           onSetActive={ComponentActions.setActiveCheckbox}
           onShowConfigDialog={ComponentActions.showOptionDialog.bind(null, 'ChartConfigDialog')}
           onAddToWatch={ComponentActions.showModalDialog.bind(null, ModalDialog.ADD_TO_WATCH)}
           {...props}
       />
     );
};

const _createMapChartItem = function(config, index, option, props){
  const { zhConfig } = config
     ,  { id, key } = zhConfig
     ,  { chartType } = option

  return(
    <MapChartItem
       ref={'chart' + index}
       key={key}
       chartType={chartType}
       caption={id}
       config={config}
       {...props}
    />
  )
};

const _rCreateItem = {
  DEFAULT : _createAreaChartItem,

  [CompItemType.EUROSTAT_MAP] : _createMapChartItem
}

const ItemFactory = {
  createItem(config, index, option, props){
    const { zhCompType } = config
        , _fnCreate = (zhCompType && _rCreateItem[zhCompType])
               ? _rCreateItem[zhCompType]
               : _rCreateItem.DEFAULT;

    return _fnCreate(config, index, option, props);
  }
};

export default ItemFactory
