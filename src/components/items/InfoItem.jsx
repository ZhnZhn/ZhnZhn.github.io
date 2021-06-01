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

const LinkList = ({ links }) => (
  <ul style={S.LINKS}>
    {(links || [])
       .map(({href, caption}, index) => (
        <li key={index}>
          <Link
             caption={`${caption}: ${href}`}
             href={href}
          />
        </li>))
    }
  </ul>
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
      <LinkList links={links} />
    </A.OpenClose>
  );
};

const InfoItem = ({ config={}, onCloseItem }) => {
  const { caption, items } = config
  const [isOpen, toggleIsOpen] = useToggle(true)
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
      <A.ShowHide isShow={isOpen}>
        <div style={S.INFO}>
          {items.map((item, index) => {
             const _key = item.caption || index;
             return _isArr(item.tokens)
               ? <FlexTokens key={_key} {...item} />
               : <Descr key={_key} {...item} />
          })}
        </div>
      </A.ShowHide>
    </div>
  );
};

export default InfoItem
