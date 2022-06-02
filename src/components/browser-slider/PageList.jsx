import Frame from './Frame';

const PageList = ({
  pages,
  onClickPrev,
  ...restProps
}) => pages.map((pageProps, index) => (
  <Frame
     {...restProps}
     {...pageProps}
     key={pageProps.id}
     pageNumber={index}
     onClickPrev={index === 0 ? void 0 : onClickPrev}
  />
))

export default PageList
