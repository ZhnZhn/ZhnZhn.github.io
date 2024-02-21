import {
  isArr,
  isStr
} from '../../storeApi';

const _assign = Object.assign
, _getSelectProps = ({
  selectProps
}={}) => isArr(selectProps)
  ? selectProps
  : []
, _getDialogProps = ({
  dialogProps
}={}) => dialogProps;

const _assignConfigTo = (
  toObj,
  conf1,
  conf2
) => {
  const dialogProps1 = _getDialogProps(conf1)
  , dialogProps2 = _getDialogProps(conf2)
  , _selectProps = [
    ..._getSelectProps(toObj),
    ..._getSelectProps(dialogProps2),
    ..._getSelectProps(dialogProps1)
  ];
  _assign(toObj, dialogProps2, dialogProps1)
  if (_selectProps.length > 0) {
    toObj.selectProps = _selectProps
  }
  return toObj;
};

const _crExtendsProps = (
  items,
  conf1
) => {
  const _extends1 = conf1.extends
  , conf2 = isStr(_extends1)
      ? items[_extends1]
      : void 0;
  return _assignConfigTo({}, conf1, conf2);
};

// [dialogType, addProps]
const crAddProps = (
  items,
  addPropsId
) => {
  const _conf = items[addPropsId]
  , _extends = _conf.extends
  , initialProps = isStr(_extends)
      ? _crExtendsProps(items, items[_extends])
      : {};
  return [
    _conf.dialogType,
    _assignConfigTo(initialProps, _conf)
  ];
};

export default crAddProps
