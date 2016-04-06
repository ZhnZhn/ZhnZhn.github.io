import React from 'react';

import {ChartActionTypes} from '../../flux/actions/ChartActions';
import ChartStore from '../../flux/stores/ChartStore';


const styles = {
  rootDiv : {
    display : 'flex',
    flexDirection : 'row',
  }
};

const ComponentHrzContainer = React.createClass({
  getInitialState(){
    return {
      containers : []
    }
  },

  componentWillMount(){
    this.unsubscribe = ChartStore.listen(this._onStore);
  },
  componentWillUnmount(){
    this.unsubscribe();
  },
  _onStore(actionType, data){
     if (actionType === ChartActionTypes.INIT_AND_SHOW_CHART){
       this.state.containers.unshift(data);
       this.setState(this.state);
     }
  },

  _renderContainers(containers){
    return containers.map((container, index) => {
      return container;
    })
  },

  render(){
    const {containers} = this.state;
    return (
       <div className="hrz-container">
          {this._renderContainers(containers)}
       </div>
    )
  }
});


export default ComponentHrzContainer
