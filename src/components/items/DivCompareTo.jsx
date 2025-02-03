import InputDmy from '../zhn/InputDmy';
import { S_ERR } from '../zhn/Input.Style';

const S_MT_6 = {
  marginTop: 6
};

const DivCompareTo = ({
  refEl,
  initialValue,
  msgErr,
  onEnter
}) => (
  <div>
    <InputDmy
      refEl={refEl}
      caption="CompareTo:"
      initialValue={initialValue}
      onEnter={onEnter}
    />
    {msgErr && <div style={S_MT_6}>
       <span style={S_ERR}>
         {msgErr}
       </span>
    </div>}
  </div>
);

export default DivCompareTo
