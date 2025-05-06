import Link from '../zhn/Link';

const DfLink = (
  props
) => {
  const {
    caption,
    ...restProps
  } = props.item;
  return (
    <Link {...restProps}>{caption}</Link>
  );
};

export default DfLink
