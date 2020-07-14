import crAdapter from '../crAdapter'
import Router from './RouterAdapter'

const IexAdapter = crAdapter(Router.getAdapter, {
   crDfKey: ({ one='', two='' }) => one + '_' + two
});

export default IexAdapter
