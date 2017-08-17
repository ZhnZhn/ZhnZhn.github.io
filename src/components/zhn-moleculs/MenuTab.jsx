import React, { Component } from 'react';

const CL = {
  SHOW: 'button-tab button-tab--show not-selected',
  NOT_SHOW: 'button-tab not-selected'
};

class MenuTab extends Component {

  componentDidMount() {
     const { onReg } = this.props;
     if (typeof onReg === 'function'){
       onReg(this.btNode)
     }
  }

  render() {
    const { isShow, caption, style, children, onClick } = this.props
        , _rootClass = isShow ? CL.SHOW : CL.NOT_SHOW;
    return (
      <div
        className={_rootClass}
        style={style}
      >
         <div
           ref = {node => this.btNode = node}
           onClick={onClick}
         >
           <span>{caption}</span>
           <span className="arrow-down"></span>
         </div>
         {children}
      </div>
    );
  }
}

export default MenuTab
