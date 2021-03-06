import ChartFn from '../../charts/ChartFn';

import CA from '../../flux/actions/ComponentActions';
import CHA from '../../flux/actions/ChartActions';
import { CompItemType as CIT } from '../../constants/Type';

import Item from '../items/Items';

const {
  crValueMoving,
  crId
} = ChartFn;

const _getIdKey = (config, index) => {
  const { zhConfig } = config
  , { id, key } = zhConfig || {};
  return [id || `Id:${index}`, key || id || crId()];
};

const _crAreaChart = function({
  config, index, chartType, props, store
}) {
  const [id, key] = _getIdKey(config, index);
  return (
    <Item.AreaChart
       key={key}
       chartType={chartType}
       caption={id}
       config={config}
       onSetActive={CA.setActiveCheckbox}
       onShowConfigDialog={CA.showConfigChart}
       onAddToWatch={CA.showAddToWatch}
       {...props}
       crValueMoving={crValueMoving}
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
  config, index, chartType, props
}) {
  const [id, key] = _getIdKey(config, index);
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
  [CIT.TABLE]: _fItem(Item.Table),
  [CIT.ALPHA_PERF]: _fItem(Item.AlphaPerf),
  [CIT.INFO_ITEM]: _fItem(Item.InfoItem),
  [CIT.TW_LIST]: _fItem(Item.TwList)
};

const ItemFactory = {
  /* { config, index, chartType, props, store } */
  crItem(itemOptions){
    const { config } = itemOptions
    , { zhCompType } = config || {}
    , _crItem = _rCrItem[zhCompType] || _rCrItem.DF;
    return _crItem(itemOptions);
  }
};

export default ItemFactory
