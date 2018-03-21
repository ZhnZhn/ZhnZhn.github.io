import React from 'react';

import ChartFn from '../../charts/ChartFn';

import ComponentActions from '../../flux/actions/ComponentActions';
import ChartActions from '../../flux/actions/ChartActions';
import { ModalDialog, CompItemType as CIT } from '../../constants/Type';

import Item from '../items/Items'

const _crAreaChart = function({
  store, config, index, option, props
}) {
  const { zhConfig={} } = config
     ,  { id=`Id:${index}`, key } = zhConfig
     , _key = key || id
     ,  { chartType } = option;
  return (
       <Item.AreaChart
           key={_key}
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

const _crMapChart = function({
  store, config, index, option, props
}) {
  const { zhConfig={} } = config
     ,  { id=`Id:${index}`, key=index } = zhConfig
     ,  { chartType } = option;

  return(
    <Item.MapChart
       key={key}
       chartType={chartType}
       caption={id}
       config={config}
       {...props}
    />
  )
};


const _fItem = (Comp) => ({
  store, config, index, option, props
}) => {
  const { id } = config;
  return (
    <Comp
      key={id}
      config={config}
      {...props}
    />
  );
}

const _rCreateItem = {
  DEFAULT: _crAreaChart,
  [CIT.EUROSTAT_MAP]: _crMapChart,
  [CIT.COIN_INFO]: _fItem(Item.CoinInfo),
  [CIT.TABLE]: _fItem(Item.Table),
  [CIT.ALPHA_PERF]: _fItem(Item.AlphaPerf)
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
