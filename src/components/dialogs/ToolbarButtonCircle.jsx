import React, { Component } from 'react';

import Row from './Row';
import ButtonCircle from '../zhn/ButtonCircle';

const STYLE = {
  ROW : {
    paddingTop: '4px',
    paddingBottom: '8px'
  },
  BUTTON_CIRCLE : {
    marginLeft: '20px'
  }
}


class ToolbarButtonCircle extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.buttons === this.props.buttons){
      return false;
    }
    return true;
  }

  _renderButtons = (buttons=[]) => {
    return buttons.map((button, index) => {
      const { caption, onClick } = button;
      return (
        <ButtonCircle
          key={caption + index}
          caption={caption}
          style={STYLE.BUTTON_CIRCLE}
          onClick={onClick}
        />
      );
    })
  }

  render(){
    const { buttons } = this.props;
    return (
      <Row style={STYLE.ROW}>
        {this._renderButtons(buttons)}
      </Row>
    )
  }

}

export default ToolbarButtonCircle
