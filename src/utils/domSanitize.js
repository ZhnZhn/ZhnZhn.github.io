import DOMPurify from "dompurify";

//only HTML { USE_PROFILES: { html: true } }, not SVG and MathML
const _sanitize = DOMPurify.sanitize;

export const domSanitize = (
  str
) => _sanitize(str, {USE_PROFILES: { html: true }})
