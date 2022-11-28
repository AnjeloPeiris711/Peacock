'use strict';

function reactInnerHTML(html) {
  return {
    dangerouslySetInnerHTML: { __html: html },
  };
}

module.exports = reactInnerHTML;
