
const createHandlerDnDGroup = function(DRAG, WatchActions){
  return {

    _handlerDragStartGroup({ caption}, ev){
       this.dragStartWithDnDStyle(ev, [DRAG.GROUP]);
       ev.dataTransfer.effectAllowed="move";
       ev.dataTransfer.dropEffect="move";
       const _data = {
         dragId : `${caption};`,
         xType : DRAG.GROUP
       };
       ev.dataTransfer.setData("text", JSON.stringify(_data));
    },

    _handlerDropGroup({ caption }, ev){
       this.dropWithDnDStyle(ev);
       const data = JSON.parse(ev.dataTransfer.getData("text"))
          ,  { xType, dragId } = data
          ,  dropId =  `${caption};`

       if (xType === DRAG.GROUP) {
         if (dragId !== dropId) {
           ev.preventDefault();
           WatchActions.dragDropGroup({
             dragId : dragId,
             dropId : dropId
           });
         } else {
           return undefined;
         }
       } else if (xType === DRAG.LIST) {
         ev.preventDefault();
         WatchActions.dragDropList({
           dragId : dragId,
           dropId : dropId
        });
      }
    },


    _handlerDragEnterGroup(ev){
       ev.preventDefault();
       this.dragEnterWithDnDStyle(ev, DRAG.GROUP);
    },

    _handlerDragOverGroup(ev){
       ev.preventDefault();
    },

    _handlerDragLeaveGroup(ev){
       ev.preventDefault();
       this.dragLeaveWithDnDStyle(ev);
    }

  };
};

export default createHandlerDnDGroup
