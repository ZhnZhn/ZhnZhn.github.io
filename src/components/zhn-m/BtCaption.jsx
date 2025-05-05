const S_HOT_KEY = { textDecoration: 'underline' };

const _crCaption = (
  hotKey,
  caption
) => {
  const _hotKeyIndex = hotKey
    ? caption
        .toUpperCase()
        .indexOf(hotKey)
    : -1;
  if (_hotKeyIndex === -1) {
    return caption;
  }

  const _beforeToken = caption.slice(0, _hotKeyIndex)
  , _hotKey = caption.slice(_hotKeyIndex, _hotKeyIndex+1)
  , _afterToken = caption.slice(_hotKeyIndex+1);
  return (
    <>
     <span>{_beforeToken}</span>
     <span style={S_HOT_KEY}>{_hotKey}</span>
     <span>{_afterToken}</span>
    </>
  );
};

export const BtCaption = ({
  className,
  caption,
  hotKey,
  children
}) => (
  <span className={className}>
    {_crCaption(hotKey, caption)}
    {children}
  </span>
)
