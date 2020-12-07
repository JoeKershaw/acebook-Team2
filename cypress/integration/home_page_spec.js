describe('Home page', function() {
  it('has sign up button', function() {
    cy.visit('/');
    cy.contains('Sign Up').click();
  });
  it('has log in button', function() {
    cy.visit('/');
    cy.contains('Log In').click();
  });
  it('displays the emojis and text', function() {
    cy.visit('/');
    cy.contains('❄️🥶 WELCOME TO 🥶❄️');
    cy.contains('❄️🥶❄️📖🥶📖❄️🥶❄️');
  });
  it('displays the IceBook logo', function() {
    cy.visit('/');
    cy.get('body').find('img').should('have.attr','src').should('include','LOGO')
  });
});
