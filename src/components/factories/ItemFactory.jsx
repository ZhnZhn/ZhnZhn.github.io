import React from 'react';

import ChartFn from '../../charts/ChartFn';

import ComponentActions from '../../flux/actions/ComponentActions';
import ChartActions from '../../flux/actions/ChartActions';
import { ModalDialog, CompItemType as CIT } from '../../constants/Type';

import AreaChartItem from '../items/AreaChartItem';
import MapChartItem from '../items/MapChartItem';
import SectorItem from '../items/SectorItem';
import CoinInfoItem from '../items/CoinInfoItem';
import CoinCapItem from '../items/CoinCapItem';

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

const _crCoinInfoItem = ({
  store, config, index, option, props
}) => {
  const { Symbol:id } = config.General;
  return (
    <CoinInfoItem
      key={id}
      config={config}
      {...props}
    />
  );
}

const _crCoinCapItem = ({
  store, config, index, option, props
}) => {
  const { id } = config;
  return (
    <CoinCapItem
      key={id}
      config={config}
      {...props}
    />
  );
}


const _rCreateItem = {
  DEFAULT : _createAreaChartItem,

  [CIT.EUROSTAT_MAP] : _createMapChartItem,
  [CIT.SECTOR] : _crSectorItem,
  [CIT.COIN_INFO]: _crCoinInfoItem,
  [CIT.COIN_CAP]: _crCoinCapItem
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
