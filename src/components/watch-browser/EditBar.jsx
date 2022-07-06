import ButtonCircle from '../zhn/ButtonCircle';

const CL_BT_WATCH_BAR = "bt__watch__bar";

const S_EDIT_BAR = {
  marginBottom: 10
}
, S_BT_LIST = {
  marginLeft: 20
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
