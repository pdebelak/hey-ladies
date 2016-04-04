(function(global) {
  'use strict';

  const test = /guys?/i;
  const regexes = [[/guys/g, 'ladies'], [/Guys/g, 'Ladies'], [/guys/gi, 'LADIES'], [/guy/g, 'lady'], [/Guy/g, 'Lady'], [/guy/gi, 'LADY']];
  const regexLength = regexes.length;

  function heyLadies() {
    let n;

    const html = document.querySelector('html');

    if (html.textContent.match(test)) {
      const walk = document.createTreeWalker(html, NodeFilter.SHOW_TEXT, null, false);
      while (n = walk.nextNode()) {
        let newContent = n.nodeValue;

        if (newContent.match(test)) {
          for (var i=0;i<regexLength;i++) {
            newContent = newContent.replace(regexes[i][0], regexes[i][1]);
          }

          n.nodeValue = newContent;
        }
      }
    }
  }

  window.heyLadies = heyLadies;
})(window);
