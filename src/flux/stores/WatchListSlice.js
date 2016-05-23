
import LocalForage from 'localforage';
import {ComponentActionTypes} from '../actions/ComponentActions';
import WatchDefault from '../../constants/WatchDefault';

const key = 'watchList';

const WatchListSlice = {
  watchList : WatchDefault,
  //watchList : null,
  initWatchList(){
    LocalForage.getItem(key).then((value) => {
      this.watchList = (value) ? value : WatchDefault;
      this.trigger(ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
    })
    .catch(() => {
      this.watchList = WatchDefault;
      this.trigger(ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
    })
  },
  getWatchList(){
    return this.watchList;
  },
  getWatchGroups(){
    return this.watchList.groups;
  },


  onAddItem(item){
    const {caption, config} = item
        , {zhConfig} = config
        , {dataColumn, id} = zhConfig;
    const toGroup = this.watchList.groups.find((group, index) => {
      return group.caption === item.groupCaption
    })
    const toList = toGroup.lists.find((list, index) => {
      return list.caption === item.listCaption
    })
    if (toList.items){
      toList.items.push({ caption, dataColumn, id });
    } else {
      toList.items = [{ caption, dataColumn, id }];
    }

    this.trigger(ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
  },

  onRemoveItem({groupCaption, listCaption, caption}){
    const groupFrom = this.watchList.groups.find((group, index) => {
      return group.caption === groupCaption;
    })
    const listFrom = groupFrom.lists.find((list, index) => {
      return list.caption === listCaption
    })
    listFrom.items = listFrom.items.filter((item , index) => {
       return item.caption !== caption
    })

    this.trigger(ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
  },

  onSaveWatch(){
    LocalForage.setItem(key , this.watchList).then(()=>{
      console.log('watchList has been saved');
    })
  }

}

export default WatchListSlice
