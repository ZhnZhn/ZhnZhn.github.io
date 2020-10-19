import Button from './Button'
import S from './Pane.Style'

const RowButtons = ({ Primary, withoutClear, onClear, onClose }) => (
  <div style={S.COMMAND_DIV}>
    {Primary}
    {!withoutClear &&
      <Button.Clear
         onClick={onClear}
      />
    }
    <Button.Close
       onClick={onClose}
    />
  </div>
);

export default RowButtons
