import React from 'react';

const styles = {
  ulStyle : {
    listStyle : 'outside none none',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '5px',
    borderBottom : '2px solid rgba(164, 135, 212, 1)'
  }
};

const TabPane = React.createClass({
  displayName : 'TabPane',

  getInitialState(){
    const components = this.props.children.map((tab, index) => {
       return  React.cloneElement(tab.props.children, { key : 'comp' + index });
    })

    return {
      selectedTabIndex : 0,
      components
    }
  },

  _handlerClickTab(index){
    this.setState({selectedTabIndex : index});
  },

  _renderTabs(children){
       const {selectedTabIndex} = this.state;
       return children.map((tab, index) => {
          const isSelected = (index === selectedTabIndex) ? true : false;
          return React.cloneElement(tab, { key : index, onClick : this._handlerClickTab.bind(null, index), isSelected })
       })
  },

  _renderComponents(children){
      const {selectedTabIndex} = this.state;
      return children.map((tab, index) => {
         const divStyle = (index === selectedTabIndex)
                    ? {display: 'block', width: "100%", height : "100%"}
                    : {display : 'none'};
         const comp = React.cloneElement(tab.props.children, { key : index, ref : 'comp' + index});
         return (
             <div style={divStyle}>
                {comp}
             </div>
           )
      })
  },

  _renderComponents2(){
      const {selectedTabIndex, components} = this.state;
      return components.map((comp, index) => {
         const divStyle = (index === selectedTabIndex)
                    ? {display: 'block', width: "100%", height : "100%"}
                    : {display : 'none'};
          return (
             <div style={divStyle} key={'a'+index}>
                {comp}
             </div>
           )
      })
  },

  render(){
    const { children, width, height } = this.props;
    return (
      <div style={{width, height}}>
        <ul className="tabpane__tabs" style={styles.ulStyle}>
           {this._renderTabs(children)}
        </ul>
        <div style={ {width: "100%", height : "100%"}}>
           {this._renderComponents2()}
        </div>
      </div>
    )
  },

  getSelectedTabIndex(){
    return this.state.selectedTabIndex;
  }

});

export default TabPane
