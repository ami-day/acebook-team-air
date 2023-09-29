import LoginForm from './LoginForm'
import {BrowserRouter} from "react-router-dom";

const navigate = () => {}

describe("Logging in", () => {
  it("calls the /tokens endpoint", () => {
    cy.mount(<BrowserRouter><LoginForm navigate={navigate}></LoginForm></BrowserRouter>)

    cy.intercept('POST', '/tokens', { token: "fakeToken" }).as("loginRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait('@loginRequest').then( interception => {
      expect(interception.response.body.token).to.eq("fakeToken")
    })
  })
})
