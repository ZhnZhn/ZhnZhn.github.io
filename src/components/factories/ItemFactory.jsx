import React from 'react';

import ChartFn from '../../charts/ChartFn';

import CA from '../../flux/actions/ComponentActions';
import CHA from '../../flux/actions/ChartActions';
import { CompItemType as CIT } from '../../constants/Type';

import Item from '../items/Items'

const _crAreaChart = function({
  store, config, index, option, props
}) {
  const { zhConfig={} } = config
     ,  { key, id=`Id:${index}` } = zhConfig
     ,  { chartType } = option;
  return (
    <Item.AreaChart
       key={key || id}
       chartType={chartType}
       caption={id}
       config={config}
       onSetActive={CA.setActiveCheckbox}
       onShowConfigDialog={CA.showConfigChart}
       onAddToWatch={CA.showAddToWatch}
       {...props}
       crValueMoving={ChartFn.crValueMoving}

       onToTop={CHA.toTop.bind(null, chartType, id)}
       onCopy={CHA.copy}
       onPasteToDialog={CA.showPasteTo}
       onZoom={CA.zoom}
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
  );
};

const _fItem = (Comp) => ({ config={}, props }) => (
  <Comp
    key={config.id}
    config={config}
    {...props}
  />
);

const _rCrItem = {
  DF: _crAreaChart,
  [CIT.EUROSTAT_MAP]: _crMapChart,
  [CIT.COIN_INFO]: _fItem(Item.CoinInfo),
  [CIT.TABLE]: _fItem(Item.Table),
  [CIT.ALPHA_PERF]: _fItem(Item.AlphaPerf),
  [CIT.FLEX_TOKENS]: _fItem(Item.FlexTokens),
  [CIT.TW_LIST]: _fItem(Item.TwList)
};

const ItemFactory = {
  /* { store, config, index, option, props } */
  createItem(itemOptions){
    const { config } = itemOptions
    , { zhCompType } = config || {}
    , _crItem = _rCrItem[zhCompType] || _rCrItem.DF;
    return _crItem(itemOptions);
  }
};

export default ItemFactory
