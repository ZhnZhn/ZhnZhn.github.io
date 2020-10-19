import useToggle from '../hooks/useToggle'

import Comp from '../Comp'
import ItemHeader from './ItemHeader'

const { ShowHide, ItemList, SvgClose } = Comp;

const CL = 'twit'

const S = {
  ROOT: {
    marginBottom: 8
  },
  SHOW_HIDE: {
    paddingTop: 8,
    paddingRight: 10
  },
  PL_16: {
    paddingLeft: 16
  },
  ROW_TITLE: {
    position: 'relative',
    color: 'gray',
    lineHeight: 1.8,
    paddingLeft: 16
  },
  BT_CLOSE: {
    position: 'absolute',
    right: 0
  },
  ROW: {
    color: 'gray',
    paddingLeft: 16
  }
};

const Twit = ({ item }) => {
  const [isShow, toggleIsShow] = useToggle(true);
  if (!isShow) { return null; }
  const {
    user, date,
    link,
    text,
    retweet, like
  } = item;
  return (
    <div className={CL} href={link}>
      <div style={S.ROW_TITLE}>
        <span>{`${user} `}</span>
        <span>{date}</span>
        <SvgClose style={S.BT_CLOSE} onClose={toggleIsShow} />
      </div>
      <a href={link}>
        <div style={S.PL_16}>{text}</div>
      </a>
      <div style={S.ROW}>
        <span>{`Retweets ${retweet} `}</span>
        <span>{`Likes ${like}`}</span>
      </div>
    </div>
  );
}

const TwList = ({ config, onCloseItem }) => {
  const { title, items } = config
  , [isOpen, toggleIsOpen] = useToggle(true);
  return (
    <div style={S.ROOT}>
      <ItemHeader
        isOpen={isOpen}
        caption={title}
        onClick={toggleIsOpen}
        onClose={onCloseItem}
      />
      <ShowHide
        isShow={isOpen}
        style={S.SHOW_HIDE}
      >
        <ItemList items={items} Item={Twit} />
      </ShowHide>
    </div>
  );
}

export default TwList
