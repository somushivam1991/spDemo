describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('http://localhost:85');

    expect(browser.getTitle()).toEqual('Sierra Pacific Retail POS');
    
    
  });
});