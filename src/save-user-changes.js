var fromInputs = document.getElementsByClassName('from');
var toInputs = document.getElementsByClassName('to');

chrome.storage.local.get(['heyLadiesUserChanges'], function(result) {
  var heyLadiesUserChanges = result.heyLadiesUserChanges;
  if (heyLadiesUserChanges && heyLadiesUserChanges[0]) {
    heyLadiesUserChanges.forEach(function(change, index) {
      if (index > 0) {
        addInputs();
      }

      fromInputs[index].value = change[0];
      toInputs[index].value = change[1];
    });
  }
});

document.addEventListener('submit', saveChanges);
document.getElementById('add').addEventListener('click', addInputs);

function saveChanges(e) {
  e.preventDefault();
  var froms = Array.prototype.slice.call(fromInputs).map(inputValue);
  var tos = Array.prototype.slice.call(toInputs).map(inputValue);
  var values = froms.map(function(value, index) {
    if (value && tos[index]) {
      return [value, tos[index]];
    }
    return null;
  }).filter(function(value) { return value; });

  if (values.length) {
    chrome.storage.local.set({ heyLadiesUserChanges: values });
  } else {
    chrome.storage.local.set({ heyLadiesUserChanges: null });
  }
}

function inputValue(input) {
  return input.value;
}

function addInputs(e) {
  if (e) {
    e.preventDefault();
  }
  var html = [
    '<div class="from-container">',
    '<label for="from">Change from</label>',
    '<input name="from" class="from" type="text">',
    '</div>',
    '<div class="to-container">',
    '<label for="to">To</label>',
    '<input name="to" class="to" type="text">',
    '</div>'
  ].join('');
  var div = document.createElement('div');
  div.innerHTML = html;
  document.getElementById('inputs').appendChild(div);
}