import LogicFn from './LogicFn';

const {
  crMsgItemExisted,

  findGroup,
  findList,
  isInArraySameCaption,
  filter
} = LogicFn;

const WithLogicItem = {

  addItem(watchList, item){
    const {caption, groupCaption, listCaption, config} = item
        , {zhConfig} = config
        , { title, subtitle, columnName, dataColumn, id, fromDate, seriaColumnNames } = zhConfig
        , toGroup = findGroup(watchList, groupCaption)
        , toList = findList(toGroup, listCaption)
        , items = toList.items;

    if ( isInArraySameCaption(items, caption) ){
      return crMsgItemExisted(caption, listCaption);
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
    return { isDone: true };
  },

  removeItem(watchList, {groupCaption, listCaption, caption}){
    const groupFrom = findGroup(watchList, groupCaption)
        , listFrom = findList(groupFrom, listCaption);

    listFrom.items = filter(listFrom.items, caption);
  }

};

export default WithLogicItem
