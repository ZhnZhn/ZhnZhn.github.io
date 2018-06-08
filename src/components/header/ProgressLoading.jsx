import React, { Component } from 'react';

import ProgressLine from '../zhn/ProgressLine';

const C = {
  LOADING : '#2f7ed8',
  FAILED : '#ed5813'
};

class ProgressLoading extends Component {
  state = {
    completed: 0,
    color: C.LOADING
  }

  componentDidMount(){
    this.unsubscribe = this.props.store
      .listenLoadingProgress(this._onStore);
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  _onStore = (actionType) => {
      const { ACTIONS } = this.props;
      if (actionType === ACTIONS.LOADING){
        this.setState({ completed: 35, color: C.LOADING })
      } else if (actionType === ACTIONS.LOADING_COMPLETE){
        this.setState({ completed: 100, color: C.LOADING })
      } else if (actionType === ACTIONS.LOADING_FAILED){
        this.setState({ completed: 100, color: C.FAILED })
      }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state.completed === nextState.completed) {
      return false;
    }
    return true;
  }

  render(){
    const { completed, color } = this.state;
    return (
      <ProgressLine
         height={3}
         color={color}
         completed={completed}
      />
    );
  }
}

export default ProgressLoading
