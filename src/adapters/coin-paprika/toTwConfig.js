import { getValue } from './fnAdapter';

const _crItems = json => {
  const items = [];
  let i;
  for(i=0; i<json.length; i++){
    const {
      user_name, date, status_id,
      status_link, status,
      retweet_count, like_count
    } = json[i];
    if (date && status_id) {
      items.push({
        id: status_id,
        user: '@' + user_name,
        link: status_link,
        date: date.replace('T', ' ').replace('Z', ''),
        text: status,
        retweet: retweet_count,
        like: like_count
      })
    }
  }
  return items;
}

const toTwConfig = {
  crKey(option){
    const { items=[] } = option;
    return (option._itemKey = getValue(items[0]));
  },

  toConfig(json, option){
    const { _itemKey, title } = option
    , config = {
        id: _itemKey,
        title: title,
        items: _crItems(json),
        zhCompType: 'TW_LIST',
        zhConfig: {
          id: _itemKey, key: _itemKey
        }
      };
    return { config };
  }
}

export default toTwConfig
