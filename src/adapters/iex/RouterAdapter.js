
import toEarnings from './toEarnings'

const _r = {
  DF: toEarnings,
  earnings: toEarnings
};

const RouterAdapter = {
  getAdapter(option){
    const { dfType } = option;        
    return _r[dfType] || _r.DF;
  }
}

export default RouterAdapter
