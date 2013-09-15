
describe("Headroom", function() {

  var rawElem      = document.querySelector('.headroom-widget'),
    rawWidget      = new Headroom(rawElem),
    pluginElem     = $('.headroom-plugin').headroom(),
    pluginWidget   = pluginElem.data('headroom'),
    dataApiElem    = $('.headroom-data-api'),
    dataApiWidget  = dataApiElem.data('headroom'),
    defaultClasses = Headroom.options.classes;

  rawWidget.init();

  beforeEach(function() {
    //window.scrollTo(0, 0);
  });

  afterEach(function() {
    //teardown
  });

  it("initialises the widgets correctly", function() {
    expect(rawElem.classList.contains(defaultClasses.initial)).toBe(true);
    expect(pluginElem[0].classList.contains(defaultClasses.initial)).toBe(true);
    expect(dataApiElem[0].classList.contains('data-api-initial')).toBe(true);
  });

  it("should unpin when scrolling down", function() {
    window.scrollTo(0, 95);

    expect(rawElem.classList.contains(defaultClasses.unpinned)).toBe(true);
    expect(pluginElem[0].classList.contains(defaultClasses.unpinned)).toBe(true);
    expect(dataApiElem[0].classList.contains('data-api-unpinned')).toBe(false);

    // greater data-api threshold
    window.scrollTo(0, 105);
    expect(dataApiElem[0].classList.contains('data-api-unpinned')).toBe(true);
  });

  it('should pin when scrolling up', function() {
    window.scrollTo(0, 103);

    expect(rawElem.classList.contains(defaultClasses.pinned)).toBe(true);
    expect(pluginElem[0].classList.contains(defaultClasses.pinned)).toBe(true);
    expect(dataApiElem[0].classList.contains('data-api-pinned')).toBe(false);

    // greater data-api threshold
    window.scrollTo(0, 95);
    expect(dataApiElem[0].classList.contains('data-api-pinned')).toBe(true);
  });

});
