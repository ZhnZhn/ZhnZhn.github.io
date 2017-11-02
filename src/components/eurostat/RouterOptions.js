
import { CompItemType } from '../../constants/Type'

const OPTIONS = {
  DF: [
    { caption : 'Default: Area', value: 'AREA' },
    { caption : 'Map: All Countries' , value: 'MAP', compType : CompItemType.EUROSTAT_MAP },
    { caption : 'Column: All Countries', value: 'COLUMN' },
    { caption : 'Bar: All Countries', value: 'BAR' }
  ],
  T2: [
    { caption : 'Default: Area', value: 'AREA' },
    { caption : 'Yearly by Months' , value: 'AREA_YEARLY' }
  ],
  T3: [
    { caption : 'Default: Area', value: 'AREA' },
    { caption : 'Column: All Items', value: 'COLUMN' },
    { caption : 'Column: All Items: Clusters', value: 'COLUMN_CLUSTER' },
    { caption : 'Bar: All Items', value: 'BAR' },
    { caption : 'Bar: All Items: Clusters', value: 'BAR_CLUSTER' }
  ]
};

const CATEGORY_TYPES = [
  'MAP',
  'COLUMN', 'COLUMN_CLUSTER',
  'BAR', 'BAR_CLUSTER'
];

const RouterOptions = {
  getOptions(optionType){
     switch(optionType){
       case 't2': return OPTIONS.T2;
       case 't3': return OPTIONS.T3;
       default: return OPTIONS.DF;
     }
  },

  isCategory(chartType) {
    if (!chartType) {
      return false;
    }
    return CATEGORY_TYPES
      .indexOf(chartType.value) !== -1;
  }

};

export default RouterOptions
