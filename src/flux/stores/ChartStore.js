import Reflux from 'reflux-core';

import Actions from '../actions/Actions';

import ChartSlice from './ChartSlice';
import { initWatchList } from '../watch-list/watchListStore';

const ChartStore = Reflux.createStore({
  listenables: [...Actions],

  init(){
    initWatchList()
  },

 ...ChartSlice
})

export default ChartStore
