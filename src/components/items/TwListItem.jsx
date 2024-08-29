import { toHref } from '../uiApi';
import useToggle from '../hooks/useToggle';

import A from '../zhn/A';
import ItemHeader from './ItemHeader';
import { BtSvgClose } from '../zhn/BtSvgX';

const {
  ShowHide,
  ItemStack
} = A;

const CL = 'twit'
, S_TW_LIST = { marginBottom: 8 }
, S_SHOW_HIDE = { padding: '8px 10px 0 0' }
, S_PL_16 = { paddingLeft: 16 }
, S_ROW_TITLE = {
  position: 'relative',
  color: 'gray',
  paddingLeft: 16,
  lineHeight: 1.8,
}
, S_ROW = {
  color: 'gray',
  paddingLeft: 16
}
, S_SVG_CLOSE = {
  top: 4
};

const Twit = ({ item }) => {
  const [
    isShow,
    toggleIsShow
  ] = useToggle(true);

  if (!isShow) { return null; }
  const {
    user,
    date,
    link,
    text,
    retweet,
    like
  } = item;
  return (
    <div className={CL}>
      <div style={S_ROW_TITLE}>
        <span>{`${user} `}</span>
        <span>{date}</span>
        <BtSvgClose style={S_SVG_CLOSE} onClick={toggleIsShow} />
      </div>
      <a href={toHref(link)}>
        <div style={S_PL_16}>{text}</div>
      </a>
      <div style={S_ROW}>
        <span>{`Retweets ${retweet} `}</span>
        <span>{`Likes ${like}`}</span>
      </div>
    </div>
  );
};

const _crTwItem = item => <Twit key={item.id} item={item} />;

export const TwListItem = ({
  config,
  onCloseItem
}) => {
  const {
    title,
    items
  } = config
  , [
    isOpen,
    toggleIsOpen
  ] = useToggle(true);
  return (
    <div style={S_TW_LIST}>
      <ItemHeader
        isOpen={isOpen}
        caption={title}
        onClick={toggleIsOpen}
        onClose={onCloseItem}
      />
      <ShowHide isShow={isOpen} style={S_SHOW_HIDE}>
        <ItemStack items={items} crItem={_crTwItem} />
      </ShowHide>
    </div>
  );
}
