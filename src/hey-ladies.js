var test = /guys?/i;
var regexes = [[/guys/g, 'ladies'], [/Guys/g, 'Ladies'], [/guys/gi, 'LADIES'], [/guy/g, 'lady'], [/Guy/g, 'Lady'], [/guy/gi, 'LADY']];
var regexLength = regexes.length;

function heyLadies() {
  var n;

  var html = document.querySelector('html');

  if (html.textContent.match(test)) {
    var walk = document.createTreeWalker(html, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode()) {
      var newContent = n.nodeValue;

      if (newContent.match(test)) {
        for (var i=0;i<regexLength;i++) {
          newContent = newContent.replace(regexes[i][0], regexes[i][1]);
        }

        n.nodeValue = newContent;
      }
    }
  }
}
