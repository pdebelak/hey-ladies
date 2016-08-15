describe('hey-ladies', function() {
  function setContent(content) {
    var contentDiv = document.getElementById('body-content');
    contentDiv.innerHTML = content;
    return contentDiv;
  }

  beforeEach(function() {
    document.querySelector('body').innerHTML += '<div id="body-content"></div>';
  });

  afterEach(function() {
    var contentDiv = document.getElementById('body-content');
    if (contentDiv && contentDiv.parentNode) {
      contentDiv.parentNode.removeChild(contentDiv);
    }
  });

  it('replaces guy with lady', function() {
    var guy = setContent('guy');
    heyLadies();
    expect(guy.textContent).toEqual('lady');
  });

  it('replaces Guy with Lady', function() {
    var guy = setContent('Guy');
    heyLadies();
    expect(guy.textContent).toEqual('Lady');
  });

  it('replaces GUY with LADY', function() {
    var guy = setContent('GUY');
    heyLadies();
    expect(guy.textContent).toEqual('LADY');
  });

  it('replaces guys with ladies', function() {
    var guy = setContent('guys');
    heyLadies();
    expect(guy.textContent).toEqual('ladies');
  });

  it('replaces Guys with Ladies', function() {
    var guy = setContent('Guys');
    heyLadies();
    expect(guy.textContent).toEqual('Ladies');
  });

  it('replaces GUYS with LADIES', function() {
    var guy = setContent('GUYS');
    heyLadies();
    expect(guy.textContent).toEqual('LADIES');
  });

  it('doesn\'t touch non text content', function() {
    var content = '<a href="guys.com">MEN</a>';
    var guyLink = setContent(content);
    heyLadies();
    expect(guyLink.innerHTML).toEqual(content);
  });

  it('can take an argument of different changes to make', function() {
    var argument = [['manly', 'ladylike']];
    var content = setContent('This guy is very manly');
    heyLadies(argument);
    expect(content.textContent).toEqual('This guy is very ladylike');
  });
});
