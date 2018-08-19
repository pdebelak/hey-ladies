var fromInputs = document.getElementsByClassName('from');
var toInputs = document.getElementsByClassName('to');
var disabledCheckbox = document.getElementById('disabled');

browser.storage.local.get(['heyLadiesUserChanges', 'heyLadiesDisabled'], function(result) {
  var heyLadiesUserChanges = result.heyLadiesUserChanges;
  var disabled = result.heyLadiesDisabled;
  if (heyLadiesUserChanges && heyLadiesUserChanges[0]) {
    heyLadiesUserChanges.forEach(function(change, index) {
      if (index > 0) {
        addInputs();
      }

      fromInputs[index].value = change[0];
      toInputs[index].value = change[1];
    });
  }

  if (disabled) {
    disabledCheckbox.checked = true;
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
  var disabled = disabledCheckbox.checked;

  if (values.length) {
    browser.storage.local.set({ heyLadiesUserChanges: values, heyLadiesDisabled: disabled });
  } else {
    browser.storage.local.set({ heyLadiesUserChanges: null, heyLadiesDisabled: disabled });
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
    '<label class="bold" for="from">Change from</label>',
    '<input name="from" class="from" type="text">',
    '</div>',
    '<div class="to-container">',
    '<label class="bold" for="to">To</label>',
    '<input name="to" class="to" type="text">',
    '</div>'
  ].join('');
  var div = document.createElement('div');
  div.innerHTML = html;
  document.getElementById('inputs').appendChild(div);
}
