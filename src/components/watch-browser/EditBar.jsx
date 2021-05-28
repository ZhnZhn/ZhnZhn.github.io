import ButtonCircle from '../zhn/ButtonCircle';

const CL_BT_WATCH_BAR = "bt__watch__bar";

const S = {
  ROOT: {
    marginBottom: 10
  },
  BT_LIST : {
    marginLeft: 20
  }
};

const EditBar = ({
  isShow,
  onClickGroup,
  onClickList
}) => isShow
   ? (<div style={S.ROOT}>
         <ButtonCircle
           caption="GROUP"
           className={CL_BT_WATCH_BAR}
           onClick={onClickGroup}
        />
        <ButtonCircle
           caption="LIST"
           className={CL_BT_WATCH_BAR}
           style={S.BT_LIST}
           onClick={onClickList}
        />
     </div>)
   : null;


export default EditBar
