import LogicFn from './LogicFn';

const WithLogicItem = {

  addItem(watchList, item){
    const {caption, groupCaption, listCaption, config} = item
        , {zhConfig} = config
        , { title, subtitle, columnName, dataColumn, id, fromDate, seriaColumnNames } = zhConfig
        , toGroup = LogicFn.findGroup(watchList, groupCaption)
        , toList = LogicFn.findList(toGroup, listCaption)
        , items = toList.items;

    if ( LogicFn.checkIsInArraySameCaption(items, caption) ){
      return LogicFn.fResultItemExisted(caption, listCaption);
    }
    if (items){
      toList.items.push({
         title, subtitle, caption, columnName, dataColumn, id, fromDate, seriaColumnNames
      });
    } else {
      toList.items = [{
        title, subtitle, caption, columnName, dataColumn, id, fromDate, seriaColumnNames
      }];
    }
    return {isDone : true}
  },

  removeItem(watchList, {groupCaption, listCaption, caption}){
    const groupFrom = LogicFn.findGroup(watchList, groupCaption)
        , listFrom = LogicFn.findList(groupFrom, listCaption);

    listFrom.items = LogicFn.filter(listFrom.items, caption);
  }

};

export default WithLogicItem
