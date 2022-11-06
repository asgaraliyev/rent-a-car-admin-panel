import { footer_html } from "./footer_html";
import { header_html } from "./header_html";

export const body_html=({children})=>`
${header_html()}
${children}
${footer_html()}


`