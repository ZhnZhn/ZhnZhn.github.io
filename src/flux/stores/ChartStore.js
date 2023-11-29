import Reflux from 'reflux-core';

import Actions from '../actions/Actions'

import ChartSlice from './ChartSlice';
import SettingSlice from './SettingSlice';
import { initWatchList } from '../watch-list/watchListStore';

const ChartStore = Reflux.createStore({
  listenables: [...Actions],

  init(){
    initWatchList()
  },

 ...ChartSlice,
 ...SettingSlice
})

export default ChartStore
