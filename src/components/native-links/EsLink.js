import ItemList from '../zhn/ItemList';
import Link from './Link';

const EUROSTAT_DATA = 'Eurostat Data'
, DATA_URL = 'https://ec.europa.eu/eurostat'
, _crBrowserHref = dataset =>
   `${DATA_URL}/databrowser/view/${dataset}/default/table?lang=en`
, _crDatabaseNodeHref = dataset =>
   `${DATA_URL}/data/database?node_code=${dataset}`;

const _crToolLinks = dataset => dataset
  ? [{
      caption: `${EUROSTAT_DATA} Browser`,
      href: _crBrowserHref(dataset)
    },{
      caption: `${EUROSTAT_DATA}base Node`,
      href: _crDatabaseNodeHref(dataset)
    }]
  : [];

const _crLinks = ({
  href,
  dataset
}) => {
  const _links = _crToolLinks(dataset);
  return _links.length > 0
    ? _links
    : void 0;
};

const _crLink = item => <Link {...item} />

const EsLink = ({
  item
}) => item ? (
  <ItemList
    items={_crLinks(item)}
    crItem={_crLink}
  />
) : null;

export default EsLink
