import React from 'react';

import ChartFn from '../../charts/ChartFn';

import ComponentActions from '../../flux/actions/ComponentActions';
import ChartActions from '../../flux/actions/ChartActions';
import { ModalDialog, CompItemType } from '../../constants/Type';

import AreaChartItem from '../items/AreaChartItem';
import MapChartItem from '../items/MapChartItem';
import SectorItem from '../items/SectorItem';

const _createAreaChartItem = function({
  store, config, index, option, props
}) {
  const { zhConfig={} } = config
     ,  { id=`Id:${index}`, key=index } = zhConfig
     ,  { chartType } = option;
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
           crValueMoving={ChartFn.crValueMoving}

           onCopy={ChartActions.copy}
           onPasteToDialog={ComponentActions.showModalDialog.bind(null, ModalDialog.PASTE_TO)}
           getCopyFromChart={store.getCopyFromChart.bind(store)}           
           ChartFn={ChartFn}
       />
     );
};

const _createMapChartItem = function({
  store, config, index, option, props
}) {
  const { zhConfig={} } = config
     ,  { id=`Id:${index}`, key=index } = zhConfig
     ,  { chartType } = option;

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

const _crSectorItem = ({
  store, config, index, option, props
}) => {
  return (
    <SectorItem
       key="key"
       config={config}
     />
  );
}

const _rCreateItem = {
  DEFAULT : _createAreaChartItem,

  [CompItemType.EUROSTAT_MAP] : _createMapChartItem,
  SECTOR : _crSectorItem
}

const ItemFactory = {
  createItem({ store, config, index, option, props }){
    const { zhCompType } = config
        , _fnCreate = (zhCompType && _rCreateItem[zhCompType])
               ? _rCreateItem[zhCompType]
               : _rCreateItem.DEFAULT;

    return _fnCreate({ store, config, index, option, props });
  }
};

export default ItemFactory
