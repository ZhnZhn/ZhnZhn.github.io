const S = {
  KEY: {
    textDecoration: 'underline'
  }
};

const _crAccessKeyIndex = (accessKey, caption) => accessKey
  ? caption.toLowerCase().indexOf(accessKey)
  : -1;

const _crCaption = (accessKey, caption) => {
  const index = _crAccessKeyIndex(accessKey, caption);
  if (index === -1) { return caption; }

  const _before = caption.substring(0, index)
  , _key = caption.substring(index, index+1)
  , _after = caption.substring(index+1);
  return (
    <>
     <span>{_before}</span>
     <span style={S.KEY}>{_key}</span>
     <span>{_after}</span>
    </>
  );
};

const CaptionInput = ({
  className,
  caption,
  accessKey,
  children
}) => {
  if (!caption) { return null; }

  return (
    <span className={className}>
      {_crCaption(accessKey, caption)}
      {children}
    </span>
  );
};

export default CaptionInput
