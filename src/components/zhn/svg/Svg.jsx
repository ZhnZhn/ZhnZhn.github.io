
export const FILL_NONE = "none"

const _crWidthHeightViewBoxProps = (
  width,
  height,
  viewBox
) => ({
  xlmns: "http://www.w3.org/2000/svg",
  width,
  height,
  viewBox
});

export const Svg = ({
  w,
  h=w,
  children,
  ...restProps
}) => (
  <svg
    {..._crWidthHeightViewBoxProps(
      `${w}px`,
      `${h}px`,
      `0 0 ${w} ${h}`
    )}
    {...restProps}
  >
    {children}
  </svg>
)

export const Svg100 = ({
  w,
  h=w,
  children,
  ...restProps
}) => (
  <svg
    {..._crWidthHeightViewBoxProps(
      "100%",
      "100%",
      `0 0 ${w} ${h}`
    )}    
    preserveAspectRatio="none"
    {...restProps}
  >
    {children}
  </svg>
)
