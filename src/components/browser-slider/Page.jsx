import SpinnerLoading from '../zhn/SpinnerLoading';
import MenuList from './MenuList';
import ErrMsg from './ErrMsg';

const Page = ({
  refFirstItem,
  model,
  fOnClickItem,
  errMsg
}) => (
  <>
   {!(model || errMsg) && <SpinnerLoading /> }
   <MenuList
     refFirstItem={refFirstItem}
     model={model}
     fOnClickItem={fOnClickItem}
   />
   <ErrMsg errMsg={errMsg} />
  </>
);

export default Page
