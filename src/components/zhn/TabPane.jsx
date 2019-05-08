import React, { Component } from 'react';
//import PropTypes from "prop-types";

const styles = {
  ulStyle : {
    listStyle : 'outside none none',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '5px',
    borderBottom : '2px solid rgba(164, 135, 212, 1)'
  }
};

class TabPane extends Component {
  /*
  static propTypes = {
    isUpdateInit: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node)
  }
  */


  constructor(props){
    super(props);

    this.isUpdateInit = props.isUpdateInit

    const components = props.children.map((tab, index) => {
       return  React.cloneElement(tab.props.children, { key : 'comp' + index });
    })
    this.state = {
      selectedTabIndex : 0,
      components
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.isUpdateInit && this.props !== nextProps){
      const components = nextProps.children.map((tab, index) => {
         return  React.cloneElement(tab.props.children, { key : 'comp' + index });
      })
      this.setState({ components })
    }
  }

  _handleClickTab = (index) => {
    this.setState({selectedTabIndex : index});
  }

  _renderTabs = (children) => {
       const {selectedTabIndex} = this.state;
       return children.map((tab, index) => {
          const isSelected = (index === selectedTabIndex) ? true : false;
          return React.cloneElement(tab, { key : index, onClick : this._handleClickTab.bind(null, index), isSelected })
       })
  }

  _renderComponents = () => {
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
  }

  render(){
    const { children, width, height } = this.props;

    return (
      <div style={{ width, height }}>
        <ul className="tabpane__tabs" style={styles.ulStyle}>
           {this._renderTabs(children)}
        </ul>
        <div style={ {width: "100%", height : "100%"}}>
           {this._renderComponents()}
        </div>
      </div>
    )
  }

  getSelectedTabIndex = () => {
    return this.state.selectedTabIndex;
  }
}

export default TabPane
