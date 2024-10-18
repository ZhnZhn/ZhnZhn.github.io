import { joinBy } from '../uiApi';
import useToggle from '../hooks/useToggle';

import OpenClose from '../zhn/OpenClose';
import ItemList from '../zhn/ItemList';
import ShowHide from '../zhn/ShowHide';
import ItemStack from '../zhn/ItemStack';

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
}
, DF_DESCR_CAPTION = "Decription";

const _crLinkItem = ({
  href,
  caption
}) => (
 <Link
    caption={joinBy(": ", caption, href)}
    href={href}
 />
);

const Descr = ({
  style,
  caption=DF_DESCR_CAPTION,
  descr,
  links
}) => descr ? (
  <OpenClose caption={caption}>
    <div style={{...S_DESCR, ...style}}>
      {descr}
    </div>
    <ItemList items={links} crItem={_crLinkItem} />
  </OpenClose>
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
      <ShowHide style={S_INFO} isShow={isOpen} >
         <ItemStack items={items} crItem={_crStackItem} />
      </ShowHide>
    </div>
  );
}
