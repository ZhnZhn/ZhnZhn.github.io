import {
  CHT_STACKED_COLUMN_PERCENT
} from '../../constants/ChartType';
import fnStacked from './fnStacked'

const { crConfig  } = fnStacked;

const toStackedColumn = (json, option) => crConfig({
   type: 'column',
   percentType: CHT_STACKED_COLUMN_PERCENT,
   json, option
});

export default toStackedColumn
