var userChanges = null;

browser.storage.local.get(['heyLadiesUserChanges', 'heyLadiesDisabled'], function(result) {
  var heyLadiesUserChanges = result.heyLadiesUserChanges;
  var disabled = result.heyLadiesDisabled;
  if (heyLadiesUserChanges && heyLadiesUserChanges[0]) {
    userChanges = heyLadiesUserChanges;
  }
  if (!disabled) {
    heyLadies(userChanges);
    var observer = new MutationObserver(function() { heyLadies(userChanges); });
    var config = {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    };
    observer.observe(document, config);
  }
});
