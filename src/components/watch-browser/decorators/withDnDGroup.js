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
    this.dragEnterWithDnDStyle(ev,
      DRAG.GROUP, DRAG.C_GROUP_ENTER
    )
  };
};

const _hDragOverGroup = function(ev){
   ev.preventDefault()
};

const _hDragLeaveGroup = function(ev){
   ev.preventDefault()
   this.dragLeaveWithDnDStyle(ev)
};

const _bindDnDGroup = function(DRAG, WatchActions){
  Object.assign(this, {
    _hDragStartGroup: _crDragStartGroup(DRAG).bind(this),
    _hDropGroup: _crDropGroup(DRAG, WatchActions).bind(this),
    _hDragEnterGroup: _crDragEnterGroup(DRAG).bind(this),
    _hDragOverGroup,
    _hDragLeaveGroup: _hDragLeaveGroup.bind(this)
 })
};

const withDnDGroup = (target) => {
  Object.assign(target.prototype, {
    _bindDnDGroup
  })
};

export default withDnDGroup
