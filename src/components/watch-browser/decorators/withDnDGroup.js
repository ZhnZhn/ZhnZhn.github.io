const _crDragStartGroup = (DRAG) => {
  return function({ caption}, ev){
     this.dragStartWithDnDStyle(ev, [DRAG.GROUP])
     ev.dataTransfer.effectAllowed="move"
     ev.dataTransfer.dropEffect="move"
     const _data = {
       dragId : `${caption};`,
       xType : DRAG.GROUP
     }
     ev.dataTransfer.setData("text", JSON.stringify(_data))
  };
};

const _crDropGroup = (DRAG, WatchActions) => {
  return function({ caption }, ev) {
    this.dropWithDnDStyle(ev)
    const data = JSON.parse(ev.dataTransfer.getData("text"))
       ,  { xType, dragId } = data
       ,  dropId =  `${caption};`;

    if (xType === DRAG.GROUP) {
      if (dragId !== dropId) {
        ev.preventDefault()
        WatchActions.dragDropGroup({
          dragId : dragId,
          dropId : dropId
        })
      } else {
        return undefined;
      }
    } else if (xType === DRAG.LIST) {
      ev.preventDefault()
      WatchActions.dragDropList({
        dragId : dragId,
        dropId : dropId
      })
    }
  };
};


const _crDragEnterGroup = (DRAG) => {
  return function(ev){
    ev.preventDefault()
    this.dragEnterWithDnDStyle(ev, DRAG.GROUP)
  };
};

const _handlerDragOverGroup = function(ev){
   ev.preventDefault()
};

const _handlerDragLeaveGroup = function(ev){
   ev.preventDefault()
   this.dragLeaveWithDnDStyle(ev)
};

const withDnDGroup = (DRAG, WatchActions) => {
  return (target) => {
    const _proto = target.prototype;
    _proto._handlerDragStartGroup = _crDragStartGroup(DRAG)
    _proto._handlerDropGroup = _crDropGroup(DRAG, WatchActions)
    _proto._handlerDragEnterGroup = _crDragEnterGroup(DRAG)
    _proto._handlerDragOverGroup = _handlerDragOverGroup
    _proto._handlerDragLeaveGroup = _handlerDragLeaveGroup
  };
}

export default withDnDGroup
