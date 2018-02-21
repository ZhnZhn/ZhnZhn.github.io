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
    this.dragEnterWithDnDStyle(ev, DRAG.LIST)
  };
};

const _handlerDragOverList = function(ev){
   ev.preventDefault()
};

const _handlerDragLeaveList = function(ev){
   ev.preventDefault()
   this.dragLeaveWithDnDStyle(ev)
}

const withDnDList = (DRAG, WatchActions) => {
  return (target) => {
    Object.assign(target.prototype, {
      _handlerDragStartList: _crDragStartList(DRAG),
      _handlerDropList: _crDropList(DRAG, WatchActions),
      _handlerDragEnterList: _crDragEnterList(DRAG),
      _handlerDragOverList: _handlerDragOverList,
      _handlerDragLeaveList: _handlerDragLeaveList,
    })
  };
}

export default withDnDList
