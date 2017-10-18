import React, { Component } from 'react';

const S = {
  ROOT : {
    display : 'inline-block',
    border : '1px solid',
    borderRadius : '10px',
    //marginLeft : '18px',
    //marginLeft : '8px',
    marginLeft : '12px',
    marginTop : '10px',
    cursor : 'pointer'
  },
  ITEM : {
    display : 'inline-block',
    paddingLeft : '5px',
    //paddingRight : '20px'
    paddingRight : '6px'
  },
  CIRCLE : {
    display : 'inline-block',
    //marginLeft : '15px',
    marginLeft : '6px',
    backgroundColor: 'gray',
    width : '12px',
    height : '12px',
    border: '1px solid gray',
    borderRadius : '50%'
  }
}

class LegendItem extends Component {
  static defaultProps = {
    item : {}
  }
  constructor(props){
    super();
    this.state = {
      isVisible : props.item.isVisible
    }
  }

  _handleClickItem = () => {
     const { item, onClickItem } = this.props
     onClickItem(item);
     this.setState({ isVisible: !this.state.isVisible })
  }

  render(){
    const { item } = this.props
        , { color, name } = item
        , { isVisible } = this.state
        , _styleRoot = (isVisible)
            ?  { color: color, borderColor: color, borderWidth: '2px', fontWeight: 'bold'}
            :  { color: color, borderColor: 'gray', borderWidth: '1px', fontWeight: 'normal' }
        , _styleCircle = (isVisible)
            ? { backgroundColor: color, borderColor: color}
            : { backgroundColor: 'gray', borderColor: 'gray' };
    return (
      <span
         style={{...S.ROOT, ..._styleRoot}}
         onClick={this._handleClickItem}
      >
        <span style={{...S.CIRCLE, ..._styleCircle}}>
        </span>
        <span
          style={S.ITEM}
        >
           {name}
        </span>
     </span>
    )
  }
}

export default LegendItem
