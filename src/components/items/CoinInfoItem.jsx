import React, { Component, memo } from 'react'

import Comp from '../Comp'
import ItemHeader from './ItemHeader'

import TwitterLink from '../about/TwitterLink'
import CrcLink from '../native-links/CrcLink'

const { ShowHide, OpenClose, DivHtml } = Comp;

const CL_TOPIC = 'ci-topic';

const S = {
  ROOT: {
    marginBottom: 8
  },
  SHOW_HIDE: {
    paddingTop: 8
  },
  TOPIC: {
    paddingLeft: 24,
    paddingRight: 24,
    lineHeight: 1.6,
    fontWeight: 600,
  },
  FIELD: {
    display: 'inline-block',
    paddingLeft: 24,
    fontWeight: 600
  },
  TITLE: {
    color: '#1b75bb'
  },
  TWITTER: {
    top: 0,
    marginLeft: 24
  },
  N_LINK: {
    marginLeft: 16
  }
};

const Field = ({ title, text }) => {
  const _text = text == null ? '' : text;
  if (!_text){
    return null;
  }
  return (
    <div style={S.FIELD}>
      <span style={S.TITLE}>
        {title}:&nbsp;
      </span>
      <span>
        {_text}
      </span>
   </div>
  );
};

const RowField = ({ items, children }) => {
  const _elFields = items
    .map(item => <Field key={item.t} title={item.t} text={item.v}/>)
    .filter(item => item !== null);
  if (_elFields.length === 0){
    return null;
  }
  return (
    <div>
      {_elFields}
      {children}
    </div>
  );
}

const Topic = memo(({ className, title, str }) => {
  if (!DivHtml.isHtml(str)) {
    return null;
  }
  return (
    <OpenClose
      caption={title}
      isClose={true}
    >
      <DivHtml
        className={className}
        style={S.TOPIC}
        str={str}
      />
    </OpenClose>
  );
})

const _isNumber = n => typeof n === 'number'
  && !Number.isNaN(n);

const _crUpdateTS = (n) => _isNumber(n)
  ? (new Date(n*1000))
      .toISOString()
      .split('T')[0]
  : '';

class CoinInfoItem extends Component {
  state = {
    isOpen: true
  }

  _hToggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  render(){
    const { config, onCloseItem } = this.props;
    const {
           Symbol:Id,
           Description, Features, Technology,
           Algorithm, ProofType, StartDate,
           TotalCoinSupply, TotalCoinsMined, PreviousTotalCoinsMined,
           BlockReward, BlockRewardReduction, BlockNumber,
           BlockTime, LastBlockExplorerUpdateTS:UpdateTS,
           Twitter
          } = config.General
       , _updateTS = _crUpdateTS(UpdateTS)
       , _twitter = Twitter.replace(/@/g, '').trim()
       , items1 = [
           { t: "Alg.", v: Algorithm },
           { t: "Proof", v: ProofType },
           { t: "StartDate", v: StartDate }
         ]
       , items2 = [
           { t: "TotalC", v: TotalCoinSupply },
           { t: "MinedC", v: TotalCoinsMined },
           { t: "PrevMined", v: PreviousTotalCoinsMined }
         ]
       , items3 = [
           { t: "Reward", v: BlockReward },
           { t: "Reduct.", v: BlockRewardReduction },
           { t: "BlNumber", v: BlockNumber }
         ]
       , items4 = [
           { t: "BlTime", v: BlockTime },
           { t: "UpdateTS", v: _updateTS}
         ]
      , { isOpen } = this.state;

    return (
      <div style={S.ROOT}>
        <ItemHeader
          isOpen={isOpen}
          caption={Id}
          onClick={this._hToggle}
          onClose={onCloseItem}
        />
        <ShowHide
          isShow={isOpen}
          style={S.SHOW_HIDE}
        >
          <OpenClose caption={`Coin Params (${Id})`}>
            <RowField items={items1} />
            <RowField items={items2} />
            <RowField items={items3} />
            <RowField items={items4} >
              <TwitterLink
                rootStyle={S.TWITTER}
                account={_twitter}
              />
            </RowField>
          </OpenClose>
          <Topic
            className={CL_TOPIC}
            title="Description"
            str={Description}
          />
          <Topic
            className={CL_TOPIC}
            title="Features"
            str={Features}
          />
          <Topic
            title="Technology"
            str={Technology}
          />
          <CrcLink
            style={S.N_LINK}
            item={Id}
          />
        </ShowHide>
      </div>
    );
  }
}

export default CoinInfoItem
