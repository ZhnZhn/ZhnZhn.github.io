import ItemList from '../zhn/ItemList';
import Link from './Link';

const EUROSTAT_DATA = 'Eurostat Data'
, HTTPS = 'https://'
, EUROSTAT = 'eurostat'
, HREF_TOKEN = 'ec.europa.eu'
, _crExploreHref = dataset =>
   `${HTTPS}appsso.${EUROSTAT}.${HREF_TOKEN}/nui/show.do?lang=en&dataset=${dataset}`
, _crBrowserHref = dataset =>
   `${HTTPS}${HREF_TOKEN}/${EUROSTAT}/databrowser/view/${dataset}/default/table?lang=en`
, _crDatabaseNodeHref = dataset =>
   `${HTTPS}${HREF_TOKEN}/${EUROSTAT}/data/database?node_code=${dataset}`;

const _crToolLinks = dataset => dataset
  ? [{
      caption: `${EUROSTAT_DATA} Explore`,
      href: _crExploreHref(dataset)
    },{
      caption: `${EUROSTAT_DATA} Browser`,
      href: _crBrowserHref(dataset)
    },{
      caption: `${EUROSTAT_DATA}base Node`,
      href: _crDatabaseNodeHref(dataset)
    }]
  : [];

const _crLinks = ({ href, dataset }) => {
  const _links = _crToolLinks(dataset);
  return _links.length > 0 ? _links : void 0;
};

const _crLink = item => <Link {...item} />

const EsLink = ({ item }) => {
  if (!item) {
    return null;
  }
  return (
    <ItemList items={_crLinks(item)} crItem={_crLink} />
  );
};

export default EsLink
