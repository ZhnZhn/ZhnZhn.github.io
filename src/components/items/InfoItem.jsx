import useToggle from '../hooks/useToggle';

import A from '../Comp';
import Link from '../native-links/Link';
import ItemHeader from './ItemHeader';
import FlexTokens from './FlexTokens';

const _isArr = Array.isArray
, S_ROOT = { marginBottom: 10 }
, S_HEADER = { height: 33 }
, S_CAPTION = { width: 'auto' }
, S_INFO = { padding: '8px 8px 0 8px' }
, S_DESCR = {
  padding: '0 4px',
  lineHeight: 1.8
};

const _crLinkItem = ({
  href,
  caption
}) => (
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
}) => descr ? (
  <A.OpenClose caption={caption}>
    <div style={{...S_DESCR, ...style}}>
      {descr}
    </div>
    <A.ItemList items={links} crItem={_crLinkItem} />
  </A.OpenClose>
) : null;

const _crStackItem = (
  item,
  index
) => {
  const _key = item.caption || index;
  return _isArr(item.tokens)
    ? <FlexTokens key={_key} {...item} />
    : <Descr key={_key} {...item} />
};

export const InfoItem = ({
  config,
  onCloseItem
}) => {
  const [
    isOpen,
    toggleIsOpen
  ] = useToggle(true)
  , {
    caption,
    items
  } = config || {};
  return (
    <div style={S_ROOT}>
      <ItemHeader
        style={S_HEADER}
        captionStyle={S_CAPTION}
        isOpen={isOpen}
        caption={caption}
        onClick={toggleIsOpen}
        onClose={onCloseItem}
      />
      <A.ShowHide style={S_INFO} isShow={isOpen} >
         <A.ItemStack items={items} crItem={_crStackItem} />
      </A.ShowHide>
    </div>
  );
}
