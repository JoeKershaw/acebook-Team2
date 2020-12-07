describe('sign up page', function() {
  it('sign up form contains the relevant fields', function() {
    cy.visit('/');
    cy.contains('Sign Up').click();

    cy.get('#sign-up-form').find('[name="username"]');
    cy.get('#sign-up-form').find('[name="password"]');
    cy.get('#sign-up-form').find('[name="title"]');
    cy.get('#sign-up-form').find('[name="firstname"]');
    cy.get('#sign-up-form').find('[name="lastname"]');
    cy.get('#sign-up-form').find('[name="Gender"]');
    cy.get('#sign-up-form').find('[name="Birthday"]');
    cy.get('#sign-up-form').find('[name="About"]');
  });
  it('displays the IceBook logo', function() {
    cy.visit('/');
    cy.contains('Sign Up').click();
    cy.get('body').find('img').should('have.attr','src').should('include','LOGO')
  });
  it('The back button takes you to the home page', function() {
    cy.visit('/');
    cy.contains('Sign Up').click();
    cy.contains('Back').click();
    cy.get('body').find('img').should('have.attr','src').should('include','LOGO')
  });
  it('displays the right text', function() {
    cy.visit('/');
    cy.contains('Sign Up').click();
    cy.contains('❄️🥶Sign Up🥶❄️');
  });
  it('sign up form takes you to the timeline', function() {
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

    cy.contains('❄️🥶Timeline🥶❄️');
    cy.get('body').find('img').should('have.attr','src').should('include','LOGO');
    cy.contains('Home');
    cy.contains('My Profile');
    cy.contains('Share');
    cy.contains('Comment');
    cy.contains('Log Out');
    cy.contains('🧊');
  });
});

// This needs figuring out.
// it('submitting without filling in a field shows a prompt', function() {
//   cy.visit('/');
//   cy.contains('Sign Up').click();
//
//   cy.get('#sign-up-form').find('[name="username"]');
//   cy.contains('Submit').click();
//   cy.get('#sign-up-form').find('[name="username"]').should('contains','Please fill in this field.')
// });
