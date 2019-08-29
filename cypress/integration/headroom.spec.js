describe("Headroom", function() {
  const classNames = obj => {
    const element = cy.get("header");
    Object.keys(obj).forEach(k => {
      element.should(obj[k] ? "have.class" : "not.have.class", k);
    });
  };

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
    classNames({
      headroom: false,
      "headroom--unpinned": false,
      "headroom--pinned": false,
      "headroom--top": false,
      "headroom--not-top": false,
      "headroom--bottom": false,
      "headroom--not-bottom": false
    });
  });

  it("works!", function() {
    initialiseHeadroom({});

    classNames({ headroom: true });

    cy.scrollTo(0, 500);
    classNames({
      "headroom--unpinned": true,
      "headroom--pinned": false,

      "headroom--top": false,
      "headroom--not-top": true,

      "headroom--bottom": false,
      "headroom--not-bottom": true
    });

    cy.scrollTo(0, 250);
    classNames({
      "headroom--unpinned": false,
      "headroom--pinned": true,

      "headroom--top": false,
      "headroom--not-top": true,

      "headroom--bottom": false,
      "headroom--not-bottom": true
    });

    cy.scrollTo(0, 0);
    classNames({
      "headroom--pinned": true,
      "headroom--unpinned": false,

      "headroom--top": true,
      "headroom--not-top": false,

      "headroom--bottom": false,
      "headroom--not-bottom": true
    });

    cy.window()
      .then(win => {
        return {
          scrollHeight: win.hr.getScrollerHeight(),
          height: win.hr.getScrollerPhysicalHeight()
        };
      })
      .then(({ height, scrollHeight }) => {
        const scrollDistanceToBottom = scrollHeight - height;

        cy.scrollTo(0, scrollDistanceToBottom - 1);
        classNames({
          "headroom--pinned": false,
          "headroom--unpinned": true,

          "headroom--top": false,
          "headroom--not-top": true,

          "headroom--bottom": false,
          "headroom--not-bottom": true
        });

        cy.scrollTo(0, scrollDistanceToBottom);
        classNames({
          "headroom--pinned": false,
          "headroom--unpinned": true,

          "headroom--top": false,
          "headroom--not-top": true,

          "headroom--bottom": true,
          "headroom--not-bottom": false
        });
      });
  });

  it("handles tolerance correctly", () => {
    initialiseHeadroom({
      tolerance: 10
    });

    cy.scrollTo(0, 5);
    classNames({
      "headroom--unpinned": false,
      "headroom--pinned": false
    });

    cy.scrollTo(0, 15);
    classNames({
      "headroom--unpinned": true,
      "headroom--pinned": false
    });

    cy.scrollTo(0, 12);
    classNames({
      "headroom--unpinned": true,
      "headroom--pinned": false
    });

    cy.scrollTo(0, 2);
    classNames({
      "headroom--unpinned": false,
      "headroom--pinned": true
    });
  });

  it("handles offset correctly", () => {
    initialiseHeadroom({
      offset: 50,
      tolerance: 10
    });

    cy.scrollTo(0, 25);
    classNames({
      "headroom--unpinned": false,
      "headroom--pinned": false
    });

    cy.scrollTo(0, 55);
    classNames({
      "headroom--unpinned": true,
      "headroom--pinned": false
    });

    cy.scrollTo(0, 49);
    classNames({
      "headroom--unpinned": false,
      "headroom--pinned": true
    });
  });

  it("handles scrollers besides window", () => {
    cy.get(".scroller").then(scroller => {
      initialiseHeadroom({ scroller: scroller[0] });
    });
    classNames({ headroom: true });

    cy.get(".scroller").scrollTo(0, 50);
    classNames({
      "headroom--pinned": false,
      "headroom--unpinned": true,

      "headroom--top": false,
      "headroom--not-top": true,

      "headroom--bottom": false,
      "headroom--not-bottom": true
    });

    cy.get(".scroller").scrollTo(0, 25);
    classNames({
      "headroom--pinned": true,
      "headroom--unpinned": false,

      "headroom--top": false,
      "headroom--not-top": true,

      "headroom--bottom": false,
      "headroom--not-bottom": true
    });

    cy.get(".scroller").scrollTo(0, 0);
    classNames({
      "headroom--pinned": true,
      "headroom--unpinned": false,

      "headroom--top": true,
      "headroom--not-top": false,

      "headroom--bottom": false,
      "headroom--not-bottom": true
    });

    cy.window()
      .then(win => {
        return {
          scrollHeight: win.hr.getScrollerHeight(),
          height: win.hr.getScrollerPhysicalHeight()
        };
      })
      .then(({ height, scrollHeight }) => {
        const scrollDistanceToBottom = scrollHeight - height;

        cy.get(".scroller").scrollTo(0, scrollDistanceToBottom - 1);
        classNames({
          "headroom--pinned": false,
          "headroom--unpinned": true,

          "headroom--top": false,
          "headroom--not-top": true,

          "headroom--bottom": false,
          "headroom--not-bottom": true
        });

        cy.get(".scroller").scrollTo(0, scrollDistanceToBottom);
        classNames({
          "headroom--pinned": false,
          "headroom--unpinned": true,

          "headroom--top": false,
          "headroom--not-top": true,

          "headroom--bottom": true,
          "headroom--not-bottom": false
        });
      });
  });
});
