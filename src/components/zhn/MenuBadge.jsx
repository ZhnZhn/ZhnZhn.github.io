import React, { Component } from 'react';

import withTheme from '../hoc/withTheme'

import Button from './ButtonCircle2'


const TH_ID = 'ELEMENT'
const CL = "menu__badge";

const S = {
  /*
  BT: {
    backgroundColor: '#1b2836'
  },
  */
  BADGE_OPENED : {
    color: 'rgba(164, 135, 212, 1)'
  }
};

class MenuBadge extends Component {
  _hClick = (event) => {
     event.stopPropagation();
     if (!this.props.isOpen){
       this.props.onClick();
     } else {
       this.props.onBadgeClose();
     }
  }

  render(){
    const {theme, counter, isOpen} = this.props
        , TS = theme.getStyle(TH_ID)
        , _btStyle = isOpen
             ? S.BADGE_OPENED
             : null;
    return (
      <Button
        className={CL}
        style={{...S.BT, ..._btStyle, ...TS.BG}}
        caption={counter}
        onClick={this._hClick}
      />
    );
  }
}


export default withTheme(MenuBadge)
