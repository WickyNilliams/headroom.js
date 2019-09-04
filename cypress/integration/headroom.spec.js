import createScroller from "../../src/scroller";

describe("Headroom", function() {
  const initialiseHeadroom = options => {
    cy.window().then(win => {
      win.hr = new win.Headroom(win.document.querySelector("header"), options);
      win.hr.init();
    });
    cy.wait(200);
  };

  beforeEach(() => {
    cy.visit("./cypress/fixtures/index.html");
  });

  afterEach(() => {
    cy.window().then(win => {
      win.hr.destroy();
    });

    cy.get("header").should("be.destroyed");
  });

  it("works!", function() {
    initialiseHeadroom();

    cy.get("header").should("be.initialised");

    cy.scrollTo(0, 50);
    cy.get("header")
      .should("not.be.pinned")
      .should("not.be.top")
      .should("not.be.bottom");

    cy.scrollTo(0, 25);
    cy.get("header")
      .should("be.pinned")
      .should("not.be.top")
      .should("not.be.bottom");

    cy.scrollTo(0, 0);
    cy.get("header")
      .should("be.pinned")
      .should("be.top")
      .should("not.be.bottom");

    cy.window()
      .then(win => createScroller(win.hr.scroller))
      .then(scroller => {
        const distanceToBottom = scroller.scrollHeight() - scroller.height();

        cy.scrollTo(0, distanceToBottom - 1);
        cy.get("header")
          .should("not.be.pinned")
          .should("not.be.top")
          .should("not.be.bottom");

        cy.scrollTo(0, distanceToBottom);
        cy.get("header")
          .should("not.be.pinned")
          .should("not.be.top")
          .should("be.bottom");
      });
  });

  it("handles tolerance correctly", () => {
    initialiseHeadroom({
      tolerance: 10
    });

    cy.scrollTo(0, 5);
    cy.get("header").should("be.initialised");

    cy.scrollTo(0, 15);
    cy.get("header").should("not.be.pinned");

    cy.scrollTo(0, 12);
    cy.get("header").should("not.be.pinned");

    cy.scrollTo(0, 2);
    cy.get("header").should("be.pinned");
  });

  it("handles offset correctly", () => {
    initialiseHeadroom({
      offset: 50,
      tolerance: 10
    });

    cy.scrollTo(0, 25);
    cy.get("header").should("be.initialised");

    cy.scrollTo(0, 55);
    cy.get("header").should("not.be.pinned");

    cy.scrollTo(0, 49);
    cy.get("header").should("be.pinned");
  });

  it("can be frozen / unfrozen", () => {
    initialiseHeadroom();

    cy.scrollTo(0, 20);
    cy.get("header").should("not.be.pinned");

    cy.window().then(win => {
      win.hr.freeze();
    });

    cy.scrollTo(0, 10);
    cy.get("header")
      .should("be.froze")
      .should("not.be.pinned");

    cy.window().then(win => {
      win.hr.unfreeze();
    });

    cy.scrollTo(0, 5);
    cy.get("header")
      .should("not.be.froze")
      .should("be.pinned");
  });

  it("handles scrollers besides window", () => {
    cy.get(".scroller").then(scroller => {
      initialiseHeadroom({ scroller: scroller[0] });
    });

    cy.get("header").should("be.initialised");

    cy.get(".scroller").scrollTo(0, 50);
    cy.get("header")
      .should("not.be.pinned")
      .should("not.be.top")
      .should("not.be.bottom");

    cy.get(".scroller").scrollTo(0, 25);
    cy.get("header")
      .should("be.pinned")
      .should("not.be.top")
      .should("not.be.bottom");

    cy.get(".scroller").scrollTo(0, 0);
    cy.get("header")
      .should("be.pinned")
      .should("be.top")
      .should("not.be.bottom");

    cy.window()
      .then(win => createScroller(win.hr.scroller))
      .then(scroller => {
        const distanceToBottom = scroller.scrollHeight() - scroller.height();

        cy.get(".scroller").scrollTo(0, distanceToBottom - 1);
        cy.get("header")
          .should("not.be.pinned")
          .should("not.be.top")
          .should("not.be.bottom");

        cy.get(".scroller").scrollTo(0, distanceToBottom);
        cy.get("header")
          .should("not.be.pinned")
          .should("not.be.top")
          .should("be.bottom");
      });
  });

  it("handles programmatically pinning/unpinning", () => {
    initialiseHeadroom();

    cy.window().then(win => {
      win.hr.unpin();
    });

    cy.get("header").should("not.be.pinned");

    cy.window().then(win => {
      win.hr.pin();
    });

    cy.get("header").should("be.pinned");
  });

  it("handles an iframe's window as the scroll source", () => {
    cy.get("iframe").then(([iframe]) => {
      initialiseHeadroom({
        scroller: iframe.contentWindow
      });
    });

    cy.get("header").should("be.initialised");

    cy.get("iframe").then(([iframe]) => {
      iframe.contentWindow.scroll(0, 50);
    });
    cy.get("header")
      .should("not.be.pinned")
      .should("not.be.top")
      .should("not.be.bottom");

    cy.get("iframe").then(([iframe]) => {
      iframe.contentWindow.scroll(0, 25);
    });
    cy.get("header")
      .should("be.pinned")
      .should("not.be.top")
      .should("not.be.bottom");
  });
});
