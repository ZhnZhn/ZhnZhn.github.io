import useToggle from '../hooks/useToggle';

import A from '../Comp';
import Link from '../native-links/Link';
import ItemHeader from './ItemHeader';
import FlexTokens from './FlexTokens';

const _isArr = Array.isArray;

const S = {
  ROOT: {
    marginBottom: 10
  },
  HEADER: {
    height: 33
  },
  CAPTION: {
    width: 'auto'
  },
  INFO: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8
  },
  DESCR: {
    paddingLeft: 4,
    paddingRight: 4,
    lineHeight: 1.8
  },
  LINKS: {
    listStyle: 'none',
  }
};

const _crLinkItem = ({href, caption}) => (
 <Link
    caption={`${caption}: ${href}`}
    href={href}
 />
);

const Descr = ({
  style,
  caption="Decription",
  descr,
  links
}) => {
  if (!descr) return null;
  return (
    <A.OpenClose caption={caption}>
      <div style={{...S.DESCR, ...style}}>
        {descr}
      </div>
      <A.ItemList items={links} crItem={_crLinkItem} />
    </A.OpenClose>
  );
};

const _crStackItem = (item, index) => {
  const _key = item.caption || index;
  return _isArr(item.tokens)
    ? <FlexTokens key={_key} {...item} />
    : <Descr key={_key} {...item} />
};

const InfoItem = ({ config={}, onCloseItem }) => {
  const { caption, items } = config
  , [isOpen, toggleIsOpen] = useToggle(true);
  return (
    <div style={S.ROOT}>
      <ItemHeader
        isOpen={isOpen}
        rootStyle={S.HEADER}
        captionStyle={S.CAPTION}
        caption={caption}
        onClick={toggleIsOpen}
        onClose={onCloseItem}
      />
      <A.ShowHide isShow={isOpen} style={S.INFO}>
         <A.ItemStack items={items} crItem={_crStackItem} />
      </A.ShowHide>
    </div>
  );
};

export default InfoItem
