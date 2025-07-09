import onCatch from '../onCatch'
import {
  ERR_10,
  ERR_TOO_MANY_REQUEST,
  ERR_NETWORK
} from '../../../constants/Msg';

const _crAlertDescrFrom = ({
  caption,
  descr
}) => ({
  alertCaption: caption,
  alertDescr: descr
});

describe('onCatch', ()=>{
  test('should call onFailed with option with alertDesr', ()=>{
    const onFailed = jest.fn()
    , _callWithAndTestFor = (error, errDescr) => {
        onCatch({ error, option: {}, onFailed })
        expect(onFailed)
          .toHaveBeenCalledWith(_crAlertDescrFrom(errDescr))
    };

    _callWithAndTestFor((new TypeError('fetch')), ERR_NETWORK)
    _callWithAndTestFor((new TypeError('429')), ERR_TOO_MANY_REQUEST)

    _callWithAndTestFor({ message: ERR_10.token }, ERR_10)

    _callWithAndTestFor(
      { errCaption: 'Some Err', message: 'msg' },
      { caption: 'Some Err', descr: 'msg' }
    )

    const ERR_DESCR_MSG = { caption: 'ERROR', descr: 'msg' };
    _callWithAndTestFor({ message: 'msg' }, ERR_DESCR_MSG)
    _callWithAndTestFor({ errCaption: '', message: 'msg' }, ERR_DESCR_MSG)

    const DF_ERR_DESCR = { caption: 'ERROR', descr: '' };
    _callWithAndTestFor({}, DF_ERR_DESCR)
    _callWithAndTestFor(void 0, DF_ERR_DESCR)
    _callWithAndTestFor(null, DF_ERR_DESCR)
  })

  test('should does not throw in case onFailed is not function', ()=>{
    expect(() => onCatch({ option: {}, error: {}}))
      .not.toThrow()
  })
})
