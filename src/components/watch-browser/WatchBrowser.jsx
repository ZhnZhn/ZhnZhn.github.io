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

import withDnDStyle from './decorators/withDnDStyle';
import withDnDGroup from './decorators/withDnDGroup';
import withDnDList from './decorators/withDnDList';
import withDnDItem from './decorators/withDnDItem';

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

@withDnDStyle
@withDnDGroup(DRAG, WatchActions)
@withDnDList(DRAG, WatchActions)
@withDnDItem(DRAG, WatchActions)
class WatchBrowser extends Component {

  constructor(props){
    super()

    this._handlerDragStartGroup =this._handlerDragStartGroup.bind(this)
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
      isShow : false,
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
        const { id, caption } = item
            , _className = (index % 2)
                 ? 'row__topic__even not-selected'
                 : 'row__topic__odd not-selected';
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
      });
    }

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
         <EditBar
            isShow={isModeEdit}
            onClickGroup={this._handlerEditGroup}
            onClickList={this._handlerEditList}
         />
         <ScrollPane style={styles.scrollDiv}>
           {watchList && this._renderWatchList(watchList)}
         </ScrollPane>
      </Browser>
    )
  }
}

export default WatchBrowser
