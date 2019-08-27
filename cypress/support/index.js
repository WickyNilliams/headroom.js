// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

chai.use((_chai, utils) => {
  _chai.Assertion.addMethod("pinned", function assertIsPinned() {
    const negate = utils.flag(this, "negate");
    const obj = utils.flag(this, "object");
    const assertion = new _chai.Assertion(obj);

    if (negate) {
      assertion.to.have
        .class("headroom--unpinned")
        .to.not.have.class("headroom--pinned");
    } else {
      assertion.to.have
        .class("headroom--pinned")
        .to.not.have.class("headroom--unpinned");
    }
  });
});

chai.use((_chai, utils) => {
  _chai.Assertion.addMethod("top", function assertIsTop() {
    const negate = utils.flag(this, "negate");
    const obj = utils.flag(this, "object");
    const assertion = new _chai.Assertion(obj);

    if (negate) {
      assertion.to.have
        .class("headroom--not-top")
        .to.not.have.class("headroom--top");
    } else {
      assertion.to.have
        .class("headroom--top")
        .to.not.have.class("headroom--not-top");
    }
  });
});

chai.use((_chai, utils) => {
  _chai.Assertion.addMethod("bottom", function assertIsBottom() {
    const negate = utils.flag(this, "negate");
    const obj = utils.flag(this, "object");
    const assertion = new _chai.Assertion(obj);

    if (negate) {
      assertion.to.have
        .class("headroom--not-bottom")
        .to.not.have.class("headroom--bottom");
    } else {
      assertion.to.have
        .class("headroom--bottom")
        .to.not.have.class("headroom--not-bottom");
    }
  });
});

chai.use((_chai, utils) => {
  _chai.Assertion.addMethod("froze", function assertIsFrozen() {
    const negate = utils.flag(this, "negate");
    const obj = utils.flag(this, "object");
    const assertion = new _chai.Assertion(obj);

    if (negate) {
      assertion.not.to.have.class("headroom--frozen");
    } else {
      assertion.to.have.class("headroom--frozen");
    }
  });
});

chai.use((_chai, utils) => {
  _chai.Assertion.addMethod("destroyed", function assertIsDestroyed() {
    const obj = utils.flag(this, "object");
    const assertion = new _chai.Assertion(obj);

    assertion.to.not.have
      .class("headroom--pinned")
      .to.not.have.class("headroom--unpinned")
      .to.not.have.class("headroom--top")
      .to.not.have.class("headroom--not-top")
      .to.not.have.class("headroom--bottom")
      .to.not.have.class("headroom--not-bottom");
  });
});

chai.use((_chai, utils) => {
  _chai.Assertion.addMethod("initialised", function assertIsInitialised() {
    const obj = utils.flag(this, "object");
    const assertion = new _chai.Assertion(obj);

    assertion.to.have
      .class("headroom")
      .to.not.have.class("headroom--pinned")
      .to.not.have.class("headroom--unpinned");
  });
});
