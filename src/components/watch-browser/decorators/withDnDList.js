import fnDnD from './fnDnD'

const _crDragStartList = (DRAG) => {
  return function({ groupCaption, caption}, ev){
    this.dragStartWithDnDStyle(ev, [DRAG.GROUP, DRAG.LIST])
    fnDnD.setTransferTo({
      event: ev,
      dragId: `${groupCaption};${caption}`,
      xType: DRAG.LIST
    })
 };
};

const _crDropList = (DRAG, WatchActions) => {
  return function({ groupCaption, caption }, ev){
   this.dropWithDnDStyle(ev)
   //ev.currentTarget.style.borderLeft = "";

   const data = JSON.parse(ev.dataTransfer.getData("text"))
      ,  { xType, dragId } = data
      ,  dropId =  `${groupCaption};${caption};`;

   if (xType === DRAG.LIST) {
     if (dragId !== dropId) {
       ev.preventDefault()
       WatchActions.dragDropList({
         dragId : dragId,
         dropId : dropId
       })
     } else {
       return undefined;
     }
   } else if (xType === DRAG.ITEM) {
     ev.preventDefault()
     WatchActions.dragDropItem({
       dragId : dragId,
       dropId : dropId
     })
   }
  };
};

const _crDragEnterList = (DRAG) => {
  return function(ev){
    ev.preventDefault()
    this.dragEnterWithDnDStyle(ev,
      DRAG.LIST, DRAG.C_LIST_ENTER
    )
  };
};

const _hDragOverList = function(ev){
   ev.preventDefault()
};

const _hDragLeaveList = function(ev){
   ev.preventDefault()
   this.dragLeaveWithDnDStyle(ev)
}

const _bindDnDList = function(DRAG, WatchActions){
  Object.assign(this, {
    _hDragStartList: _crDragStartList(DRAG).bind(this),
    _hDropList: _crDropList(DRAG, WatchActions).bind(this),
    _hDragEnterList: _crDragEnterList(DRAG).bind(this),
    _hDragOverList,
    _hDragLeaveList: _hDragLeaveList.bind(this)
  })
}

const withDnDList = (target) => {
  Object.assign(target.prototype, {
    _bindDnDList
  })
}

export default withDnDList
