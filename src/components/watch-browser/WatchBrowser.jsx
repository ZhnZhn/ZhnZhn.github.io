import React, { Component } from 'react';

import { ModalDialog } from '../../constants/Type';
import ComponentActions from '../../flux/actions/ComponentActions';
import WatchActions from '../../flux/actions/WatchActions';

import Browser from '../zhn/Browser';
import BrowserCaption from '../zhn/BrowserCaption';
import ButtonCircle from '../zhn/ButtonCircle';
import ScrollPane from '../zhn/ScrollPane';
import OpenClose2 from '../zhn/OpenClose2';
import EditBar from './EditBar';
import WatchItem from './WatchItem';

import Decor from './decorators/Decorators';

const C_FILL_OPEN = '#80c040';
const CL_WATCH_ITEM = 'row__type2-topic not-selected';

const DRAG = {
  GROUP : 'GROUP',
  LIST : 'LIST',
  ITEM : 'ITEM'
};

const S = {
  BROWSER: {
    paddingRight: '0px'
  },
  BT_CIRCLE: {
    marginLeft: '20px',
    position: 'relative',
    top: '-2px'
  },
  SCROLL_DIV: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  GROUP_DIV: {
    lineHeight : 2
  },
  LIST_DIV: {
    marginLeft : '8px',
    paddingLeft : '12px',
    borderLeft : '1px solid yellow',
    lineHeight : 2
  },
  ITEM_NOT_SELECTED: {
    borderBottom : '1px solid rgba(128, 192, 64, 0.6)',
    marginRight : '10px'
  }
};

@Decor.withDnDStyle
@Decor.withDnDGroup(DRAG, WatchActions)
@Decor.withDnDList(DRAG, WatchActions)
@Decor.withDnDItem(DRAG, WatchActions)
class WatchBrowser extends Component {

  constructor(props){
    super()

    this._handlerDragStartGroup = this._handlerDragStartGroup.bind(this)
    this._handlerDropGroup = this._handlerDropGroup.bind(this)
    this._handlerDragEnterGroup = this._handlerDragEnterGroup.bind(this)
    this._handlerDragLeaveGroup = this._handlerDragLeaveGroup.bind(this)

    this._handlerDragStartList = this._handlerDragStartList.bind(this)
    this._handlerDropList = this._handlerDropList.bind(this)
    this._handlerDragEnterList = this._handlerDragEnterList.bind(this)
    this._handlerDragLeaveList = this._handlerDragLeaveList.bind(this)

    this._handlerDragStartItem = this._handlerDragStartItem.bind(this)
    this._handlerDropItem = this._handlerDropItem.bind(this)
    this._handlerDragEnterItem = this._handlerDragEnterItem.bind(this)
    this._handlerDragLeaveItem = this._handlerDragLeaveItem.bind(this)

    this.state = {
      isShow : !!props.isInitShow,
      isModeEdit : false,
      watchList : props.store.getWatchList()
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  _onStore = (actionType, data) => {
     const { browserType, showAction, updateAction } = this.props;
     if (actionType === showAction && data === browserType ){
      this._handlerShow()
    } else if (actionType === updateAction) {
      this.setState({ watchList: data })
    }
  }

  _handlerHide = () => {
     this.setState({ isShow : false })
  }
  _handlerShow = () => {
     this.setState({ isShow : true })
  }

  _handlerSaveWatch() {
    WatchActions.saveWatch()
  }
  _handlerToggleEditMode = () => {
    this.setState({ isModeEdit : !this.state.isModeEdit })
  }

  _handlerEditGroup() {
    ComponentActions.showModalDialog(ModalDialog.EDIT_WATCH_GROUP)
  }
  _handlerEditList() {
    ComponentActions.showModalDialog(ModalDialog.EDIT_WATCH_LIST)
  }

  _renderWatchList = (watchList) => {
     const { isModeEdit } = this.state;
     return watchList.groups.map((group, index) => {
       const {caption, lists} = group;
       return (
               <OpenClose2
                  key={index}
                  style={S.GROUP_DIV}
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
              );
     });
  }

  _renderLists = (lists, groupCaption) => {
    const { isModeEdit } = this.state;
    return lists.map((list, index) => {
      const {caption, items} = list;
      return (
        <OpenClose2
           key={index}
           fillOpen={C_FILL_OPEN}
           style={S.LIST_DIV}
           styleNotSelected={S.ITEM_NOT_SELECTED}
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
      );
    });
  }

  _handlerClickItem(item) {
    ComponentActions.showModalDialog(ModalDialog.LOAD_ITEM, item)
  }
  _handlerRemoveItem(option, event) {
    event.stopPropagation()
    WatchActions.removeItem(option)
  }

  _renderItems = (items, groupCaption, listCaption) => {
      const {isModeEdit} = this.state;
      return items.map((item, index) => {
        const { id, caption } = item;
        return (
            <WatchItem
               key={id}
               className={CL_WATCH_ITEM}
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
      });
    }

  render(){
    const { caption } = this.props
        , { isShow, isModeEdit, watchList } = this.state
        , _captionEV = isModeEdit ? 'V' : 'E';
    return (
       <Browser isShow={isShow} style={S.BROWSER}>
          <BrowserCaption
            caption={caption}
            onClose={this._handlerHide}
          >
           <ButtonCircle
             caption="S"
             title="Save to LocalStorage"
             style={S.BT_CIRCLE}
             onClick={this._handlerSaveWatch}
           />
           <ButtonCircle
              caption={_captionEV}
              title="Toggle Edit Mode: E/V"
              style={S.BT_CIRCLE}
              onClick={this._handlerToggleEditMode}
           />
         </BrowserCaption>
         <EditBar
            isShow={isModeEdit}
            onClickGroup={this._handlerEditGroup}
            onClickList={this._handlerEditList}
         />
         <ScrollPane style={S.SCROLL_DIV}>
           {watchList && this._renderWatchList(watchList)}
         </ScrollPane>
      </Browser>
    )
  }
}

export default WatchBrowser
