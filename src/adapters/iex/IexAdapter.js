import crAdapter from '../crAdapter'
import Router from './RouterAdapter'

const IexAdapter = crAdapter(Router.getAdapter, {
   crDfKey: ({ _itemKey, one='', two='' }) => _itemKey
     || one + '_' + two
});

export default IexAdapter
