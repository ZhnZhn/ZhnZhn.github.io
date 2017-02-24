import React from 'react';

import WithDnDStyle from './with/WithDnDStyle';
import createHandlerDnDGroup from './with/createHandlerDnDGroup';
import createHandlerDnDList from './with/createHandlerDnDList';
import createHandlerDnDItem from './with/createHandlerDnDItem';

import { ModalDialog } from '../../constants/Type';
import ComponentActions from '../../flux/actions/ComponentActions';
import WatchActions from '../../flux/actions/WatchActions';

import Browser from '../zhn/Browser';
import BrowserCaption from '../zhn/BrowserCaption';
import ButtonCircle from '../zhn/ButtonCircle';
import ScrollPane from '../zhn/ScrollPane';
import OpenClose2 from '../zhn/OpenClose2';
import WatchItem from './WatchItem';


const DRAG = {
  GROUP : 'GROUP',
  LIST : 'LIST',
  ITEM : 'ITEM'
};

const styles = {
  browser : {
    paddingRight: '0px'
  },
  btCircle : {
    marginLeft: '20px',
    lineHeight: 'initial',
    position: 'relative',
    top: '-2px'
  },
  scrollDiv : {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  groupDiv : {
    lineHeight : 2
  },
  listDiv : {
    marginLeft : '8px',
    paddingLeft : '12px',
    borderLeft : '1px solid yellow',
    lineHeight : 2
  },
  itemNotSelected : {
    borderBottom : '1px solid rgba(128, 192, 64, 0.6)',
    marginRight : '10px'
  }
};

const WatchBrowser = React.createClass({
  ...WithDnDStyle,
  ...createHandlerDnDGroup(DRAG, WatchActions),
  ...createHandlerDnDList(DRAG, WatchActions),
  ...createHandlerDnDItem(DRAG, WatchActions),

  getInitialState(){
    const {store} = this.props;
    return {
      isShow : false,
      isModeEdit : false,
      watchList : store.getWatchList()
    }
  },

  componentWillMount: function(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function(){
    this.unsubscribe();
  },
  _onStore: function(actionType, data){
     const { browserType, showAction, updateAction } = this.props;
     if (actionType === showAction && data === browserType ){
      this._handlerShow();
    } else if (actionType === updateAction) {
      this.setState({ watchList: data })
    }
  },

  _handlerHide(){
     this.setState({ isShow : false })
  },
  _handlerShow(){
     this.setState({ isShow : true })
  },

  _handlerSaveWatch(){
    WatchActions.saveWatch();
  },
  _handlerToggleEditMode(){
    this.setState({ isModeEdit : !this.state.isModeEdit });
  },

  _handlerEditGroup(){
    ComponentActions.showModalDialog(ModalDialog.EDIT_WATCH_GROUP);
  },
  _handlerEditList(){
    ComponentActions.showModalDialog(ModalDialog.EDIT_WATCH_LIST);
  },

  _renderWatchList(watchList){
     const { isModeEdit } = this.state;
     return watchList.groups.map((group, index) => {
       const {caption, lists} = group;
       return (
               <OpenClose2
                  key={index}
                  style={styles.groupDiv}
                  caption={caption}
                  isClose={true}
                  isDraggable={isModeEdit}
                  option={{ caption }}
                  onDragStart={this._handlerDragStartGroup}
                  onDragEnter={this._handlerDragEnterGroup}
                  onDragOver={this._handlerDragOverGroup}
                  onDragLeave={this._handlerDragLeaveGroup}
                  onDrop={this._handlerDropGroup}
                >
                {lists && this._renderLists(lists, caption)}
                </OpenClose2>
              )
     })
  },

  _renderLists(lists, groupCaption){
    const { isModeEdit } = this.state;
    return lists.map((list, index) => {
      const {caption, items} = list;
      return (
        <OpenClose2
           key={index}
           fillOpen={'#80c040'}
           style={styles.listDiv}
           styleNotSelected={styles.itemNotSelected}
           caption={caption}
           isClose={true}
           isDraggable={isModeEdit}
           option={{ groupCaption, caption }}
           onDragStart={this._handlerDragStartList}
           onDragEnter={this._handlerDragEnterList}
           onDragOver={this._handlerDragOverList}
           onDragLeave={this._handlerDragLeaveList}
           onDrop={this._handlerDropList}
        >
         {items && this._renderItems(items, groupCaption, caption)}
        </OpenClose2>
      )
    })
  },

  _handlerClickItem(item){
    ComponentActions.showModalDialog(ModalDialog.LOAD_ITEM, item);
  },
  _handlerRemoveItem(option, event){
    event.stopPropagation();
    WatchActions.removeItem(option);
  },

  _renderItems(items, groupCaption, listCaption) {
      const {isModeEdit} = this.state;
      return items.map((item, index) => {
        const { id, caption } = item
            , _className = (index % 2)
                 ? 'row__topic__even not-selected'
                 : 'row__topic__odd not-selected'
        return (
            <WatchItem
               key={id}
               className={_className}
               isModeEdit={isModeEdit}
               item={item}
               option={{ groupCaption, listCaption, caption }}
               onClick={this._handlerClickItem}
               onClose={this._handlerRemoveItem}
               onDragStart={this._handlerDragStartItem}
               onDragOver={this._handlerDragOverItem}
               onDragEnter={this._handlerDragEnterItem}
               onDragLeave={this._handlerDragLeaveItem}
               onDrop={this._handlerDropItem}
            />
        );
      })
    },

  _renderEditBar(isModeEdit){
    if (isModeEdit){
      return (
        <div style={{marginBottom: '10px'}}>
           <ButtonCircle
             caption={'GROUP'}
             className={'bt__watch__bar'}
             isWithoutDefault={true}
             onClick={this._handlerEditGroup}
          />
          <ButtonCircle
             caption={'LIST'}
             className={'bt__watch__bar'}
             isWithoutDefault={true}
             style={{marginLeft: '20px'}}
             onClick={this._handlerEditList}
          />
        </div>
      )
    } else {
      return null;
    }
  },

  render(){
    const { caption } = this.props
        , { isShow, isModeEdit, watchList } = this.state
        , _captionEV = (isModeEdit) ? 'V' : 'E';
    return (
       <Browser isShow={isShow} style={styles.browser}>
          <BrowserCaption
            caption={caption}
            onClose={this._handlerHide}
          >         
           <ButtonCircle
             caption={'S'}
             style={styles.btCircle}
             onClick={this._handlerSaveWatch}
           />
           <ButtonCircle
              caption={_captionEV}
              style={styles.btCircle}
              onClick={this._handlerToggleEditMode}
           />
         </BrowserCaption>
         {this._renderEditBar(isModeEdit)}
         <ScrollPane style={styles.scrollDiv}>
           {watchList && this._renderWatchList(watchList)}
         </ScrollPane>
      </Browser>
    )
  }
});

export default WatchBrowser
