import ButtonCircle from '../zhn/ButtonCircle';

const CL_BT_WATCH_BAR = "bt__watch__bar";

const S_EDIT_BAR = {
  margin: '4px 0'
}
, S_BT_LIST = {
  marginLeft: 15
};

const EditBar = ({
  isShow,
  onClickGroup,
  onClickList
}) => isShow
   ? (<div style={S_EDIT_BAR}>
         <ButtonCircle
           caption="GROUP"
           className={CL_BT_WATCH_BAR}
           onClick={onClickGroup}
        />
        <ButtonCircle
           caption="LIST"
           className={CL_BT_WATCH_BAR}
           style={S_BT_LIST}
           onClick={onClickList}
        />
     </div>)
   : null;


export default EditBar
