var userChanges = null;

chrome.storage.local.get(['heyLadiesUserChanges'], function(result) {
  var heyLadiesUserChanges = result.heyLadiesUserChanges;
  if (heyLadiesUserChanges && heyLadiesUserChanges[0]) {
    userChanges = heyLadiesUserChanges;
  }
  heyLadies(userChanges);
  window.setInterval(function() { heyLadies(userChanges); }, 1000);
});
