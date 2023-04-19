import { crItemLink } from '../crFn';
import { DESCR_EMPTY } from './conf';

const _crWebsiteLink = crItemLink
  .bind(null, "Website UN Comtrade Data", "https://comtradeplus.un.org/TradeFlow/")

//Caution: The results depend on available reported data, and the level of details may vary.

const _crDescr = json => {
  return DESCR_EMPTY;
};

export const toDescr = (
  json,
  option
) => option.period
  ? option.subtitle + _crWebsiteLink()
  : _crDescr(json) + _crWebsiteLink()
