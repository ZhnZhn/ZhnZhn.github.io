import ValidationMessages from '../zhn/ValidationMessages';
import RowButtons from './RowButtons';

const WatchPane = ({
  validationMessages,
  refBtClose,
  caption,
  title,  
  onPrimary,
  withoutClear,
  onClear,
  onClose,
  children
}) => (
  <div>
    {children}
    <ValidationMessages
      validationMessages={validationMessages}
    />
    <RowButtons
       refBtClose={refBtClose}
       caption={caption}
       title={title}
       onPrimary={onPrimary}
       withoutClear={withoutClear}
       onClear={onClear}
       onClose={onClose}
    />
  </div>
);

export default WatchPane
