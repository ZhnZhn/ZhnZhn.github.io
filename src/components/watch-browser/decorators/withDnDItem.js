
import fnDnD from './fnDnD';

const _crDragStartItem = (DRAG) => {
  return function({groupCaption, listCaption, caption}, ev){
    this.dragStartWithDnDStyle(ev, [DRAG.LIST, DRAG.ITEM])
    fnDnD.setTransferTo({
      event: ev,
      dragId: `${groupCaption};${listCaption};${caption}`,
      xType: DRAG.ITEM
    })
  };
};

const _crDropItem = (DRAG, WatchActions) => {
  return function({ groupCaption, listCaption, caption }, ev){
     this.dropWithDnDStyle(ev)
     const data = JSON.parse(ev.dataTransfer.getData("text"))
         , { xType, dragId } = data
         , dropId = `${groupCaption};${listCaption};${caption}`;

     if (xType === DRAG.ITEM) {
       if ( dragId !== dropId) {
         ev.preventDefault()
         WatchActions.dragDropItem({
           dragId : dragId,
           dropId : dropId
         })
      } else {
        return undefined;
      }
    }
  };
};

const _crDragEnterItem = (DRAG) => {
  return function(ev){
    ev.preventDefault()
    this.dragEnterWithDnDStyle(ev, DRAG.ITEM)
 };
};

const _handlerDragOverItem = function(ev){
   ev.preventDefault()
};

const _handlerDragLeaveItem = function(ev){
   ev.preventDefault()
   this.dragLeaveWithDnDStyle(ev)
};

const withDnDItem = (DRAG, WatchActions) => {
  return (target) => {
    Object.assign(target.prototype, {
      _handlerDragStartItem: _crDragStartItem(DRAG),
      _handlerDropItem: _crDropItem(DRAG, WatchActions),
      _handlerDragEnterItem: _crDragEnterItem(DRAG),
      _handlerDragOverItem: _handlerDragOverItem,
      _handlerDragLeaveItem: _handlerDragLeaveItem,
    })
  };
}

export default withDnDItem
