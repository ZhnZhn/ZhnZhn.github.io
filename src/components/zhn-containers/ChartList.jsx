import { bindTo } from '../uiApi';
import { crItem } from '../factories/ItemFactory';

const ChartList = ({
  refChartFn,
  configs,
  store,
  chartType,
  browserType,
  isAdminMode,
  onCloseItem
}) => (
  <div>
   {(configs || [])
     .map((config, index) => {
       const { zhConfig, zhCompType } = config
       , { id } = zhConfig || {};
       return crItem({
         store,
         config, index,
         chartType,
         props: {
           isAdminMode,
           ref: zhCompType
             ? void 0
             : bindTo(refChartFn, index),
           onCloseItem: () => onCloseItem(chartType, browserType, id)
         }
      });
   })}
 </div>
);


export default ChartList
