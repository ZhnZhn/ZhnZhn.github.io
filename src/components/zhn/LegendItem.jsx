import React, { Component } from 'react';

const Style = {
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
        , { isVisible } = this.state
        , _styleRoot = (isVisible)
            ?  { color: item.color, borderColor: item.color, borderWidth: '2px', fontWeight: 'bold'}
            :  { color: item.color, borderColor: 'gray', borderWidth: '1px', fontWeight: 'normal' }
        , _styleCircle = (isVisible)
            ? { backgroundColor: item.color, borderColor: item.color}
            : { backgroundColor: 'gray', borderColor: 'gray' };
    return (
      <span
         style={Object.assign({}, Style.ROOT, _styleRoot)}
         onClick={this._handleClickItem}
      >
        <span style={Object.assign({}, Style.CIRCLE, _styleCircle)}>
        </span>
        <span
          style={Style.ITEM}
        >
           {item.name}
        </span>
     </span>
    )
  }
}

export default LegendItem
