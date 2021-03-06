
import ItemFactory from '../factories/ItemFactory';

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
       const { zhConfig } = config
       , { id, zhCompType } = zhConfig || {};
       return ItemFactory.crItem({
         store,
         config, index,
         chartType,
         props: {
           isAdminMode,
           ref: zhCompType
             ? void 0
             : refChartFn.bind(null, index),
           onCloseItem: () => onCloseItem(chartType, browserType, id)
         }
      });
   })}
 </div>
);


export default ChartList
