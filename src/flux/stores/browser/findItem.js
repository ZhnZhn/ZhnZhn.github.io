
const _isArr = Array.isArray;


const _findOrCheckItem = (item, chartType) => {
  if (_isArr(item.items)) {
    for(const subItem of item.items) {
      if (subItem.id === chartType) {
        return subItem;
      }
    }
  } else if (item.id === chartType) {
     return item;
  }
};

const findItem = (menu, chartType) => {
  if (!_isArr(menu)) {return;}

  for (const topics of menu){
    const items = topics.items;
    if (_isArr(items)) {
      for(const item of items){
        const _item = _findOrCheckItem(item, chartType)
        if (_item) {return _item;}
      }
    }
  }
};

export default findItem
