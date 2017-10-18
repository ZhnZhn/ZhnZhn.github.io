import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ComponentHrzContainer extends Component {
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func
    }),
    addAction: PropTypes.string
  }

  constructor(props){
    super()
    this.state = {
      containers : []
    }
  }

  componentDidMount(){
    const { store } = this.props;
    this.unsubscribe = store.listen(this._onStore)
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  _onStore = (actionType, data) => {
     if (actionType === this.props.addAction){
       this.setState(prevState => {
         prevState.containers.unshift(data)
         return prevState;
       })
     }
  }

  _renderContainers(containers){
    return containers.map(container => {
      return container;
    });
  }

  render(){
    const { containers } = this.state;
    return (
       <div className="hrz-container">
          {this._renderContainers(containers)}
       </div>
    )
  }
}

export default ComponentHrzContainer
