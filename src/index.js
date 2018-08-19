var userChanges = null;

browser.storage.local.get(['heyLadiesUserChanges', 'heyLadiesDisabled'], function(result) {
  var heyLadiesUserChanges = result.heyLadiesUserChanges;
  var disabled = result.heyLadiesDisabled;
  if (heyLadiesUserChanges && heyLadiesUserChanges[0]) {
    userChanges = heyLadiesUserChanges;
  }
  if (!disabled) {
    heyLadies(userChanges);
    window.setInterval(function() { heyLadies(userChanges); }, 1000);
  }
});
