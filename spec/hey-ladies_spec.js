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
    window.heyLadies();
    expect(guy.textContent).toEqual('lady');
  });

  it('replaces Guy with Lady', function() {
    var guy = setContent('Guy');
    window.heyLadies();
    expect(guy.textContent).toEqual('Lady');
  });

  it('replaces GUY with LADY', function() {
    var guy = setContent('GUY');
    window.heyLadies();
    expect(guy.textContent).toEqual('LADY');
  });

  it('replaces guys with ladies', function() {
    var guy = setContent('guys');
    window.heyLadies();
    expect(guy.textContent).toEqual('ladies');
  });

  it('replaces Guys with Ladies', function() {
    var guy = setContent('Guys');
    window.heyLadies();
    expect(guy.textContent).toEqual('Ladies');
  });

  it('replaces GUYS with LADIES', function() {
    var guy = setContent('GUYS');
    window.heyLadies();
    expect(guy.textContent).toEqual('LADIES');
  });

  it('doesn\'t touch non text content', function() {
    var content = '<a href="guys.com">MEN</a>';
    var guyLink = setContent(content);
    window.heyLadies();
    expect(guyLink.innerHTML).toEqual(content);
  });
});
