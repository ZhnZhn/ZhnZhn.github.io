import React from 'react'

import SvgHrzResize from './zhn/SvgHrzResize';
import SvgClose from './SvgClose';

const styles = {
  captionDiv : {
    backgroundColor: '#232F3B',
    color: 'rgba(164, 135, 212, 1)',
    height: '28px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    marginRight: '5px',
    marginBottom: '10px',
  },
  captionSpan: {
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  }
};

const CaptionRow = React.createClass({
  render: function(){
    const {isResizable, initWidth, minWidth, maxWidth, comp, onResizeAfter } = this.props;
    const _compHrzResize = (isResizable) ? (
      <SvgHrzResize
         initWidth={initWidth}
         minWidth={minWidth}
         maxWidth={maxWidth}
         comp={comp}
         onResizeAfter={onResizeAfter}
      />
    ) : undefined;

    return (
      <div style={styles.captionDiv}>
         <span
            className="not-selected"
            style={styles.captionSpan}
         >
           {this.props.caption}
        </span>
        {_compHrzResize}
        <SvgClose onClose={this.props.onClose} />
      </div>
    )
  }
});

export default CaptionRow;
