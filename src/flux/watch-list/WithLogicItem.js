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
    const {
      caption,
      groupCaption, listCaption,
      config
    } = item
    , {zhConfig} = config
    , {
      id, title, subtitle,
      columnName, dataColumn,
      fromDate, seriaColumnNames,
      itemConf
    } = zhConfig
    , toGroup = findGroup(watchList, groupCaption)
    , toList = findList(toGroup, listCaption);

    if ( isInArraySameCaption(toList.items, caption) ){
      return crMsgItemExisted(caption, listCaption);
    }
    const _item = {
      id, title, subtitle, caption,
      columnName, dataColumn,
      fromDate, seriaColumnNames,
      itemConf
    };
    if (toList.items){
      toList.items.push(_item);
    } else {
      toList.items = [_item];
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
