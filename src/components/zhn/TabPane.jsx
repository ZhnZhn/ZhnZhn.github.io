import React, { Component } from 'react';
//import PropTypes from "prop-types";

const CL = "tabpane__tabs";

const S = {
  UL: {
    listStyle: 'outside none none',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    borderBottom: '2px solid rgba(164, 135, 212, 1)'
  },
  BLOCK: {
    display: 'block',
    width: "100%",
    height: "100%"
  },
  NONE: {
    display: 'none'
  },
  DIV: {
    width: "100%",
    height: "100%"
  }
};

class TabPane extends Component {
  /*
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node)
  }
  */
  constructor(props){
    super(props);

    this.state = {
      selectedTabIndex: 0
    }
  }

  _hClickTab = (index) => {
    this.setState({ selectedTabIndex: index });
  }

  _renderTabs = (children) => {
     const { selectedTabIndex } = this.state;
     return children.map((tab, index) => {
        const isSelected = (index === selectedTabIndex);
        return React.cloneElement(tab, {
          key : index,
          onClick : this._hClickTab.bind(null, index),
          isSelected
        });
     });
  }

  _renderComponents = () => {
    const { children } = this.props;
    const { selectedTabIndex } = this.state;
    return children.map((tab, index) => {
       const _isSelected = (index === selectedTabIndex)
       , _divStyle = _isSelected ? S.BLOCK : S.NONE
        return (
           <div style={_divStyle} key={'a'+index}>
              {React.cloneElement(tab.props.children, {
                key: 'comp'+index,
                isSelected: _isSelected
              })}
           </div>
         );
    });
  }

  render(){
    const { children, width, height } = this.props;

    return (
      <div style={{ width, height }}>
        <ul className={CL} style={S.UL}>
           {this._renderTabs(children)}
        </ul>
        <div style={S.DIV}>
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
