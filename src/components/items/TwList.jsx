import useToggle from '../hooks/useToggle';
import Comp from '../Comp';
import ItemHeader from './ItemHeader';

const {
  toLink,
  ShowHide,
  ItemStack,
  SvgClose
} = Comp;

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
, S_BT_CLOSE = {
  position: 'absolute',
  right: 0
}
, S_ROW = {
  color: 'gray',
  paddingLeft: 16
};

const Twit = ({ item }) => {
  const [isShow, toggleIsShow] = useToggle(true);
  if (!isShow) { return null; }
  const {
    user, date,
    link,
    text,
    retweet, like
  } = item
  , _link = toLink(link);
  return (
    <div className={CL} href={_link}>
      <div style={S_ROW_TITLE}>
        <span>{`${user} `}</span>
        <span>{date}</span>
        <SvgClose style={S_BT_CLOSE} onClose={toggleIsShow} />
      </div>
      <a href={_link}>
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

const TwList = ({ config, onCloseItem }) => {
  const { title, items } = config
  , [isOpen, toggleIsOpen] = useToggle(true);
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
};

export default TwList
