import React, { Component } from 'react'

import ShowHide from '../zhn/ShowHide'

const S = {
  RANK: {
    marginBottom: '4px'
  },
  RANK_HEADER: {
   color: 'rgb(164, 135, 212)',

   backgroundColor: 'rgb(35, 47, 59)',
   paddingTop: '4px',
   lineHeight: '1.8',
   height: '32px',
   width: '100%',
   borderTopRightRadius: '2px',
   borderBottomRightRadius: '2px',

   paddingLeft: '16px',
   fontWeight: 'bold',
   cursor: 'pointer'
 },
 RANK_CAPTION: {
   display: 'inline-block',
   width: '230px'
 },
 RANK_VALUE_UP: {
   color: 'rgb(76, 175, 80)'
 },
 RANK_VALUE_DOWN: {
   color: 'rgb(244, 67, 54)'
 }
}

const RankValue = ({ value='' }) => {
  const _style = (value[0] === '-')
           ? S.RANK_VALUE_DOWN
           : S.RANK_VALUE_UP;
  return (
    <span style={_style}>
      {value}
    </span>
  );
}

class RankItem extends Component {
  constructor(props){
    super()
    this.state = {
      isShowItems: false
    }
  }

  _handleClickCaption = () => {
    this.setState({ isShowItems: !this.state.isShowItems })
  }

  _renderItems = (items) => {
    return items.map(item => {
      const { caption, value } = item;
      return (
        <div
          className="row__topic"
          key={caption}
        >
          <span style={S.RANK_CAPTION}>
            {caption}
          </span>
          <RankValue value={value} />
        </div>
      );
    });
  }

  render(){
    const { caption, items=[] } = this.props
        , { isShowItems } = this.state;
    return (
      <div style={S.RANK}>
        <div
          style={S.RANK_HEADER}
          onClick={this._handleClickCaption}
        >
           {caption}
        </div>
        <ShowHide isShow={isShowItems}>
          {this._renderItems(items)}
        </ShowHide>
      </div>
    );
  }
}


class SectorItem extends Component {

  _renderRanks = (ranks) => {
    return ranks.map((rank, index) => {
      const { caption, items } = rank;
      return (
        <RankItem
          key={index}
          caption={caption}
          items={items}
        />
      );
    })
  }

  render() {
    const { config={} } = this.props
        , { ranks=[] } = config;
    return (
      <div>
        {this._renderRanks(ranks)}
      </div>
    );
  }
}

export default SectorItem
