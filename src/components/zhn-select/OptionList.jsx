
const OptionList = ({
  options,
  selectedIndex,
  className,
  refOptionNode,
  onClick,
  propCaption,
  ItemComp
}) => options.map((item, index)=>(
   /*eslint-disable jsx-a11y/click-events-have-key-events*/
   <div
     role="option"
     aria-selected={selectedIndex === index}
     tabIndex="0"
     key={index}
     className={className}
     ref={n => refOptionNode(n, index)}
     onClick={() => onClick(item, index, propCaption)}
   >
     <ItemComp
        item={item}
        propCaption={propCaption}
     />
   </div>
   /*eslint-enable jsx-a11y/click-events-have-key-events*/
 ));




export default OptionList
