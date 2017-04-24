
const _crDragStartList = (DRAG) => {
  return function({ groupCaption, caption}, ev){
    this.dragStartWithDnDStyle(ev, [DRAG.GROUP, DRAG.LIST])
    ev.dataTransfer.effectAllowed="move"
    ev.dataTransfer.dropEffect="move"
    const _data = {
      dragId : `${groupCaption};${caption}`,
      xType : DRAG.LIST
    };
    ev.dataTransfer.setData("text", JSON.stringify(_data))
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
    const _proto = target.prototype;
    _proto._handlerDragStartList = _crDragStartList(DRAG)
    _proto._handlerDropList = _crDropList(DRAG, WatchActions)
    _proto._handlerDragEnterList = _crDragEnterList(DRAG)
    _proto._handlerDragOverList = _handlerDragOverList
    _proto._handlerDragLeaveList = _handlerDragLeaveList
  };
}

export default withDnDList
