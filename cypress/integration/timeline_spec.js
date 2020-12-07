function signUpUser(){
  cy.visit('/');
  cy.contains('Sign Up').click();

  cy.get('#sign-up-form').find('[name="username"]').type('test@test.com');
  cy.get('#sign-up-form').find('[name="password"]').type('123');
  cy.get('#sign-up-form').find('[name="title"]').type('Mr');
  cy.get('#sign-up-form').find('[name="firstname"]').type('test');
  cy.get('#sign-up-form').find('[name="lastname"]').type('case');
  cy.get('#sign-up-form').find('[id="Gender1"]').select('Male');
  cy.get('#sign-up-form').find('[name="Birthday"]').type('2020-12-25');
  cy.get('#sign-up-form').find('[name="About"]').type('Hey!');
  cy.get('#sign-up-form').submit();
}

describe('Timeline', function() {
  it('timeline contains relevant content', function() {
    signUpUser()

    cy.contains('❄️🥶Timeline🥶❄️');
    cy.get('body').find('img').should('have.attr','src').should('include','LOGO');
    cy.contains('Home');
    cy.contains('My Profile');
    cy.contains('Share');
    cy.contains('Comment');
    cy.contains('Log Out');
    cy.contains('🧊');
  });
  it('has log out button', function() {
    signUpUser()
    cy.contains('Log Out').click();

    cy.contains('❄️🥶Log Out🥶❄️')
    cy.get('body').find('img').should('have.attr','src').should('include','LOGO');
  });
  it('a post can be posted from timeline entry', function() {
    signUpUser()

    cy.get('#new-post-form1').find('[name="message"]').type('This is a post');
    cy.get('div').find('[class="tlposts"]').should('have.attr','src').should('include','LOGO');
  });

});
