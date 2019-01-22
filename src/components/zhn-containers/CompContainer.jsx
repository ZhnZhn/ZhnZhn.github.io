import React, { Component } from 'react';
//import PropTypes from 'prop-types';

const CL = "hrz-container";

class CompContainer extends Component {
  /*
  static propTypes = {
    className: PropTypes.string,
    store: PropTypes.shape({
      listen: PropTypes.func
    }),
    addAction: PropTypes.string
  }
  */
  static defaultProps = {
    className: CL
  }

  state = {
    containers: []
  }

  componentDidMount(){
    this.unsubscribe = this.props.store
      .listen(this._onStore)
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  _onStore = (actionType, Comp) => {
     if (actionType === this.props.addAction){
       this.setState(prevState => {
         prevState.containers.unshift(Comp)
         return prevState;
       })
     }
  }

  render(){
    return (
     <div className={this.props.className}>
       {this.state.containers}
     </div>
    );
  }
}

export default CompContainer
