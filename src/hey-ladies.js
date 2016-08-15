var heyLadies = (function() {
  'use strict';

  // from http://stackoverflow.com/a/4878800/3945932
  function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  // from http://stackoverflow.com/a/1026087/3945932
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return function(userChanges) {
    const rawChanges = userChanges || [['guys', 'ladies'], ['guy', 'lady']];

    const changes = rawChanges.map(change => change.map(changePart => changePart.toLowerCase()));;
    const test = new RegExp(`(${changes.map(change => change[0]).join('|')})`, 'i');

    const regexes = changes.map(change => [
      [
        new RegExp(change[0], 'g'),
        change[1]
      ], [
        new RegExp(toTitleCase(change[0]), 'g'),
        toTitleCase(change[1])
      ], [
        new RegExp(capitalizeFirstLetter(change[0]), 'g'),
        capitalizeFirstLetter(change[1])
      ], [
        new RegExp(change[0], 'gi'),
        change[1].toUpperCase()
      ]
    ]).reduce((builtRegexes, groupOfRegexes) => builtRegexes.concat(groupOfRegexes), []);

    const regexLength = regexes.length;
    let node;

    const html = document.querySelector('html');

    if (html.textContent.match(test)) {
      const walker = document.createTreeWalker(html, NodeFilter.SHOW_TEXT, null, false);
      while (node = walker.nextNode()) {
        let newContent = node.nodeValue;

        if (newContent.match(test)) {
          for (var i=0;i<regexLength;i++) {
            newContent = newContent.replace(regexes[i][0], regexes[i][1]);
          }

          node.nodeValue = newContent;
        }
      }
    }
  };
})();
