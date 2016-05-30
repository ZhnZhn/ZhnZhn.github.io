import React from 'react';

import {ChartActionTypes} from '../../flux/actions/ChartActions';
import ProgressLine from '../zhn/ProgressLine';

const Colors = {
  LOADING : '#2F7ED8',
  FAILED : 'rgb(237, 88, 19)'
};

const ProgressLoading = React.createClass({
  getInitialState(){
    return {
      completed : 0,
      color : Colors.LOADING
    }
  },
  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount(){
    this.unsubscribe();
  },
  _onStore(actionType, option){
      if (actionType === ChartActionTypes.LOAD_STOCK){
        this.setState({completed: 35, color: Colors.LOADING});
      } else if (actionType === ChartActionTypes.LOAD_STOCK_COMPLETED                 
                 || actionType === ChartActionTypes.LOAD_STOCK_ADDED){
        this.setState({completed: 100, color: Colors.LOADING});
      } else if (actionType === ChartActionTypes.LOAD_STOCK_FAILED){
        this.setState({completed: 100, color: Colors.FAILED})
      }
  },


  render(){
    const {completed, color} = this.state;
    return (
      <ProgressLine
         height={3}
         color={color}
         completed={completed}
      />
    )
  }
});

export default ProgressLoading
