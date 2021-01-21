import onCatch from '../onCatch'
import Msg from '../../../constants/Msg';

const M = Msg.Alert;

const _crAlertDescrFrom = ({ caption, descr }) => ({
  alertCaption: caption,
  alertDescr: descr
});

describe('onCatch', ()=>{
  test('should call onFailed with option with alertDesr', ()=>{
    const onFailed = jest.fn()
    , _callWithAndTestFor = (error, errDescr) => {
        onCatch({ error, option: {}, onFailed })
        expect(onFailed)
          .toBeCalledWith(_crAlertDescrFrom(errDescr))
    };

    _callWithAndTestFor((new TypeError('fetch')), M.NETWORK_ERROR)
    _callWithAndTestFor((new TypeError('429')), M.TOO_MANY_REQUEST)

    _callWithAndTestFor({ message: M.ERR_10.token }, M.ERR_10)

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
