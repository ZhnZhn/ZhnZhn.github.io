import crAdapterOHLCV  from '../crAdapterOHLCV';
import {
  crAddConfig,
  //crCaption
} from './fnAdapter';

const _getData = ({ results }) => results
  .map(({ t, v, l, h, c, o }) => ({
     date: t,
     volume: v,
     low: l,
     high: h,
     open: o,
     close: c
  }));

export const PlgAdapter = crAdapterOHLCV({
  //crCaption,
  getArr: _getData,
  crAddConfig,
  toDate: t => t
})
