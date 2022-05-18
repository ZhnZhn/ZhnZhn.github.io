import {
  crValueMoving,
  crId
} from '../../charts/ChartFn';

import CA from '../../flux/actions/ComponentActions';
import ChartActions, {
  CHAT_TO_TOP,
  CHAT_COPY
} from '../../flux/actions/ChartActions';
import {
  CIT_EUROSTAT_MAP,
  CIT_TABLE,
  CIT_ALPHA_PERF,
  CIT_INFO_ITEM,
  CIT_TW_LIST
} from '../../constants/CompItemType';

import Item from '../items/Items';

const _getIdKey = (config, index) => {
  const { zhConfig } = config
  , { id, key } = zhConfig || {};
  return [id || `Id:${index}`, key || id || crId()];
};


const _fAddToWatch = (
  caption,
  config
) => () => CA.showAddToWatch({ caption, config });

const _fOnPasteToDialog = store => {
  return toChart => CA.showPasteTo({
    toChart,
    fromChart: store.getCopyFromChart()
  });
};

const _crAreaChart = function({
  config,
  index,
  chartType,
  props,
  store
}) {
  const [id, key] = _getIdKey(config, index);
  return (
    <Item.AreaChart
       key={key}
       chartType={chartType}
       caption={id}
       config={config}
       onSetActive={CA.setActiveCheckbox}
       onAddToWatch={_fAddToWatch(id, config)}
       {...props}
       crValueMoving={crValueMoving}
       onToTop={ChartActions[CHAT_TO_TOP].bind(null, chartType, id)}
       onCopy={ChartActions[CHAT_COPY]}
       onPasteTo={_fOnPasteToDialog(store)}
       onZoom={CA.zoom}
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
  [CIT_EUROSTAT_MAP]: _crMapChart,
  [CIT_TABLE]: _fItem(Item.Table),
  [CIT_ALPHA_PERF]: _fItem(Item.AlphaPerf),
  [CIT_INFO_ITEM]: _fItem(Item.InfoItem),
  [CIT_TW_LIST]: _fItem(Item.TwList)
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
