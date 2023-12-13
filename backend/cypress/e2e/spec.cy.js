describe('Perform Basic Todo Operations', () => {
  it('Add Todo', () => {
    cy.visit('http://localhost:3000/');
    cy.get(".add-todo-input").click().type("Sample Todo Created By Cypress");
    cy.get(".add-todo-button").click();
    cy.get(".todo-text").last().should("contain","Sample Todo Created By Cypress");
  });

  it('Update Todo', () => {
    cy.visit('http://localhost:3000/');
    cy.get(".todo-text").last().should("contain","Sample Todo Created By Cypress");
    cy.get(".card>input[type='checkbox']").last().click();
    cy.get(".card>input[type='checkbox']").last().check();
  });

  it('Remove Todo', () => {
    cy.visit('http://localhost:3000/');
    cy.get(".todo-text").last().should("contain","Sample Todo Created By Cypress");
    cy.get(".remove-todo-button").last().click();
    cy.get(".todo-text").last().should("not.have.value","Sample Todo Created By Cypress");
  });
})