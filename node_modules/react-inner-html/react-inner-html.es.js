export default function reactInnerHTML(html) {
  return {
    dangerouslySetInnerHTML: { __html: html },
  };
}
