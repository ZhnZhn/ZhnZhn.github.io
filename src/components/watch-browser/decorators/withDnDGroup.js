import fnDnD from './fnDnD';

const _crDragStartGroup = (DRAG) => {
  return function({ caption}, ev){
     this.dragStartWithDnDStyle(ev, [DRAG.GROUP])
     fnDnD.setTransferTo({
       event: ev,
       dragId: `${caption};`,
       xType: DRAG.GROUP
     })     
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
    Object.assign(target.prototype, {
      _handlerDragStartGroup: _crDragStartGroup(DRAG),
      _handlerDropGroup: _crDropGroup(DRAG, WatchActions),
      _handlerDragEnterGroup: _crDragEnterGroup(DRAG),
      _handlerDragOverGroup: _handlerDragOverGroup,
      _handlerDragLeaveGroup: _handlerDragLeaveGroup
   })
  };
}

export default withDnDGroup
