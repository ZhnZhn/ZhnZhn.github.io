import React from 'react';

import {BrowserType, ModalDialog} from '../../constants/Type';
import ComponentActions from '../../flux/actions/ComponentActions';
import {ComponentActionTypes} from '../../flux/actions/ComponentActions';
import WatchActions from '../../flux/actions/WatchActions';

import Browser from '../zhn/Browser';
import CaptionRow from '../CaptionRow';
import ButtonCircle from '../zhn/ButtonCircle';
import ScrollPane from '../zhn/ScrollPane';
import OpenClose2 from '../zhn/OpenClose2';
import SvgClose from '../SvgClose';


const showAction = ComponentActionTypes.SHOW_BROWSER
    , browserType = BrowserType.WATCH_LIST
    , updateViewAction = ComponentActionTypes.UPDATE_WATCH_BROWSER;


const styles = {
  browser : {
    paddingRight: 0
  },
  btCircle : {
    marginLeft: '10px'
  },
  scrollDiv : {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  groupDiv : {
    marginLeft : '8px',
    paddingLeft : '12px',
    borderLeft : '1px solid yellow',
    lineHeight : 2
  },
  itemDiv : {
    position: 'relative',
    paddingRight: '40px',
    lineHeight : 1.4,
    paddingTop : '5px',
    paddingBottom: '5px'
  },
  itemSpan : {
    display: 'inline-block',
    verticalAlign : 'middle',
    width: '100%',
    maxWidth: '250px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

  },
  itemNotSelected : {
    borderBottom : '1px solid rgba(128, 192, 64, 0.6)',
    marginRight : '10px'
  },
  svgClose : {
    position: 'absolute',
    right: 0
  }
};

const WatchBrowser = React.createClass({
  getInitialState(){
    const {store} = this.props;
    return {
      isShow : false,
      isModeEdit : false,
      watchList : store.getWatchList(),
    }
  },

  componentWillMount: function(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function(){
    this.unsubscribe();
  },
  _onStore: function(actionType, data){
     const {store} = this.props;
     if (actionType === showAction && data === browserType ){
      this._handlerShow();
    } else if (actionType === updateViewAction) {
      this.setState({watchList: data})
    }
  },

  _handlerHide(){
     this.setState({isShow : false})
  },
  _handlerShow(){
     this.setState({isShow : true})
  },

  _handlerSaveWatch(){
    WatchActions.saveWatch();
  },
  _handlerToggleEditMode(){
    this.setState({isModeEdit : !this.state.isModeEdit});
  },

  _handlerRemoveItem(option, event){
    event.stopPropagation();
    WatchActions.removeItem(option);
  },

  _renderWatchList(watchList){
     return watchList.groups.map((group, index) => {
       const {caption, lists} = group;
       return (
               <OpenClose2
                  key={index}
                  caption={caption}
                  isClose={true}
                >
                {lists && this._renderLists(lists, caption)}
                </OpenClose2>
              )
     })
  },

  _renderLists(lists, groupCaption){    
    return lists.map((list, index) => {
      const {caption, items} = list;
      return (
        <OpenClose2
           key={index}
           fillOpen={'#80c040'}
           style={styles.groupDiv}
           styleNotSelected={styles.itemNotSelected}
           caption={caption}
           isClose={true}
        >
         {items && this._renderItems(items, groupCaption, caption)}
        </OpenClose2>
      )
    })
  },

  _renderItems(items, groupCaption, listCaption) {
      const {isModeEdit} = this.state;
      return items.map((item, index) => {
        const _className = (index % 2) ? 'row__topic__even not-selected' : 'row__topic__odd not-selected'
            , {caption, id} = item
            , _btClose = (isModeEdit) ? (
                 <SvgClose
                    style={styles.svgClose}
                    onClose={this._handlerRemoveItem.bind(null, {groupCaption, listCaption, caption})}
                 />
               ) : undefined;
        return (
             <div
               key={id}
               className={_className}
               onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.LOAD_ITEM, item)}
               style={styles.itemDiv}
             >
               <span style={styles.itemSpan}>
                 {caption}
               </span>
               {_btClose}
            </div>
        )
      })
  },



  render(){
    const {isShow, isModeEdit, watchList} = this.state;
    const _captionEV = (isModeEdit) ? 'E' : 'V';
    return (
       <Browser isShow={isShow} style={{paddingRight: 0}}>
         <CaptionRow
            caption="Watch List"
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
         </CaptionRow>
         <ScrollPane style={styles.scrollDiv}>
           {watchList && this._renderWatchList(watchList)}
         </ScrollPane>
      </Browser>
    )
  }
});

export default WatchBrowser
