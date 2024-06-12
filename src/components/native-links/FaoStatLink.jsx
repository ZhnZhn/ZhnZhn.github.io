import { isStr } from '../uiApi';
import Link from './Link';

const DATA_URL = 'https://www.fao.org/faostat/en/#data/';

const FaoStatLink = ({
  item
}) => (
  <Link
    href={isStr(item)
      ? DATA_URL + item
      : DATA_URL
    }
    caption="FAOSTAT Link"
  />
);

export default FaoStatLink
