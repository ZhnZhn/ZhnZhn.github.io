import React from 'react';

import {BrowserType} from '../../constants/Type';
import {ComponentActionTypes} from '../../flux/actions/ComponentActions';

import Browser from '../zhn/Browser';
import CaptionRow from '../CaptionRow';
import OpenClose2 from '../zhn/OpenClose2';


const showAction = ComponentActionTypes.SHOW_BROWSER
    , browserType = BrowserType.WATCH_LIST;

const WatchBrowser = React.createClass({
  getInitialState(){
    const {store} = this.props;
    return {
      isShow : false,
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
     const {store} = this.props;
     if (actionType === showAction && data === browserType ){
      this._handlerShow();
    }
  },

  _handlerHide(){
     this.setState({isShow : false})
  },
  _handlerShow(){
     this.setState({isShow : true})
  },

  _renderLists(lists){
    return lists.map((list, index) => {
      return (
        <OpenClose2
           key={index}
           fillOpen={'#80c040'}
           style={{paddingLeft: '20px'}}             
           caption={list.title}
           isClose={true}
        >
        </OpenClose2>
      )
    })
  },

  _renderWatchList(watchList){
     return watchList.groups.map((group, index) => {
       return (
               <OpenClose2
                  key={index}
                  caption={group.title}
                  isClose={true}
                >
                {group.lists && this._renderLists(group.lists)}
                </OpenClose2>
              )
     })
  },
  render(){
    const {isShow, watchList} = this.state;
    return (
       <Browser isShow={isShow}>
         <CaptionRow
            caption="Watch List"
            onClose={this._handlerHide}
         />
         {this._renderWatchList(watchList)}
      </Browser>
    )
  }
});

export default WatchBrowser
