(function(global){

  describe('Headroom', function(){

    var headroom, elem, classList;

    beforeEach(function() {
      classList = jasmine.createSpyObj('classList', ['add', 'remove', 'contains']);
      elem      = { classList : classList };
      headroom  = new Headroom(elem);
      Headroom.cutsTheMustard = true;
    });

    describe('constructor', function() {

      var debouncer;

      function onPin(){}
      function onUnpin(){}

      beforeEach(function(){
        debouncer = spyOn(global, 'Debouncer').andCallThrough();
      });

      it('stores the arguments it is passed', function() {
        var hr = new Headroom(elem, {
          onPin : onPin,
          onUnpin : onUnpin
        });

        expect(hr.lastKnownScrollY).toBe(0);
        expect(hr.elem).toBe(elem);
        expect(hr.tolerance).toBe(Headroom.options.tolerance);
        expect(hr.offset).toBe(Headroom.options.offset);
        expect(hr.classes).toBe(Headroom.options.classes);
        expect(hr.scroller).toBe(Headroom.options.scroller);
        expect(hr.onPin).toBe(onPin);
        expect(hr.onUnpin).toBe(onUnpin);
      });

      it('merges the options arguments properly', function() {
        var userOpts = {
          tolerance : {
            down : 5,
            up : 30
          },
          scroller: document.body,
          classes : {
            initial : 'hr'
          }
        };

        var hr = new Headroom(elem, userOpts);

        expect(hr.tolerance).toBe(userOpts.tolerance);
        expect(hr.offset).toBe(Headroom.options.offset);
        expect(hr.scroller).toBe(userOpts.scroller);
        expect(hr.classes.initial).toBe(userOpts.classes.initial);
        expect(hr.classes.pinned).toBe(Headroom.options.classes.pinned);
      });

    });

    describe('init', function() {

      var st, bind, debouncer;

      beforeEach(function() {
        debouncer = spyOn(global, 'Debouncer').andCallThrough();
        st   = spyOn(global, 'setTimeout');
        bind = spyOn(Headroom.prototype.attachEvent, 'bind').andReturn(function(){});
      });

      it('initialises debouncer', function() {
        headroom.init();

        expect(headroom.debouncer).toBeDefined();
        expect(debouncer).toHaveBeenCalled();
        expect(headroom.debouncer instanceof debouncer).toBeTruthy();
      });

      it('adds initial class and binds to scroll event', function() {
        headroom.init();

        expect(classList.add).toHaveBeenCalledWith(headroom.classes.initial);
        expect(bind).toHaveBeenCalled();
        expect(st).toHaveBeenCalledWith(jasmine.any(Function), 100);
      });

      it('does nothing if user agent doesn\'t cut the mustatd', function() {
        Headroom.cutsTheMustard = false;

        headroom.init();

        expect(headroom.debouncer).not.toBeDefined();
        expect(debouncer).not.toHaveBeenCalled();

        expect(classList.add).not.toHaveBeenCalled();
        expect(bind).not.toHaveBeenCalled();
        expect(st).not.toHaveBeenCalled();
      });
    });

    describe('destroy', function() {

      var removeEventListener;

      beforeEach(function() {
        removeEventListener = spyOn(global, 'removeEventListener');
      });

      it('cleans up after events and classes', function() {
        headroom.initialised = true;

        headroom.destroy();

        expect(classList.remove.calls.length).toBe(Object.keys(Headroom.options.classes).length);
        expect(removeEventListener).toHaveBeenCalledWith('scroll', headroom.debouncer, false);
        expect(headroom.initialised).toBe(false);
      });

    });

    describe('attachEvent', function() {
      var addEventListener;
      var requestAnimationFrame;

      global.requestAnimationFrame = function() {};

      beforeEach(function() {
        addEventListener = spyOn(global, 'addEventListener');
        requestAnimationFrame = spyOn(global, 'requestAnimationFrame');
        headroom.init();
      });

      it('should attach listener for scroll event', function(){
        headroom.attachEvent();

        expect(headroom.initialised).toBe(true);
        expect(addEventListener).toHaveBeenCalledWith('scroll', headroom.debouncer, false);
        expect(requestAnimationFrame.calls.length).toBe(1);
      });

      it('will only ever add one listener', function() {
        headroom.attachEvent();
        headroom.attachEvent();

        expect(addEventListener.calls.length).toBe(1);
        expect(requestAnimationFrame.calls.length).toBe(1);
      });

    });

    describe('pin', function() {

      beforeEach(function() {
        headroom.onPin = jasmine.createSpy();
      });

      describe('when unpinned class is present', function() {

        beforeEach(function() {
          classList.contains.andReturn(true);
          headroom.pin();
        });

        it('should add pinned class and remove unpinned class', function(){
          expect(classList.remove).toHaveBeenCalledWith(headroom.classes.unpinned);
          expect(classList.add).toHaveBeenCalledWith(headroom.classes.pinned);
        });

        it('should invoke callback if supplied', function() {
          expect(headroom.onPin).toHaveBeenCalled();
        });

      });

      describe('when unpinned class not present', function() {

        beforeEach(function() {
          headroom.pin();
        });

        it('should do nothing', function() {
          expect(headroom.onPin).not.toHaveBeenCalled();
        });

      });

    });

    describe('unpin', function() {

      var classes;


      beforeEach(function() {
        headroom.onUnpin = jasmine.createSpy();
        classes = {};

        classList.contains.andCallFake(function(className) {
          return classes[className];
        });
      });

      function setupFixture (pinned, unpinned) {
        classes[Headroom.options.classes.unpinned] = unpinned;
        classes[Headroom.options.classes.pinned] = pinned;
      }

      describe('when currently pinned', function() {

        beforeEach(function() {
          setupFixture(true, false);
          headroom.unpin();
        });

        it('will add unpinned class', function() {
          expect(classList.add).toHaveBeenCalledWith(headroom.classes.unpinned);
        });

        it('will remove pinned class', function() {
          expect(classList.remove).toHaveBeenCalledWith(headroom.classes.pinned);
        });

        it('will invoke callback if supplied', function() {
          expect(headroom.onUnpin).toHaveBeenCalled();
        });
      });

      describe('when currently unpinned', function() {
        it('will do nothing', function() {
          setupFixture(false, true);
          headroom.unpin();
          expect(headroom.onUnpin).not.toHaveBeenCalled();
        });
      });

      describe('when never been unpinned', function() {
        it('will unpin', function() {
          setupFixture(false, false);
          headroom.unpin();
          expect(headroom.onUnpin).toHaveBeenCalled();
        });
      });

    });

    describe('shouldUnpin', function() {
      it('returns true if scrolling down and tolerance exceeded and past offset', function() {
        var result = headroom.shouldUnpin(1, true);
        expect(result).toBe(true);
      });
    });

    describe('shouldPin', function() {

      it('returns true if scrolling up and tolerance exceeded', function() {
        var result = headroom.shouldPin(-1, true);
        expect(result).toBe(true);
      });

      it('returns true if pastOffset', function() {
        var result = headroom.shouldPin(-1, false);
        expect(result).toBe(true);
      });
    });

    describe('top', function() {

      beforeEach(function() {
        headroom.onTop = jasmine.createSpy();
      });

      describe('when top class is not present', function() {

        beforeEach(function() {
          classList.contains.andReturn(false);
          headroom.top();
        });

        it('should add top class', function(){
          expect(classList.add).toHaveBeenCalledWith(headroom.classes.top);
        });

        it('should remove notTop class', function(){
          expect(classList.remove).toHaveBeenCalledWith(headroom.classes.notTop);
        });

        it('should invoke callback if supplied', function() {
          expect(headroom.onTop).toHaveBeenCalled();
        });

      });

      describe('when top class is present', function() {

        beforeEach(function() {
          classList.contains.andReturn(true);
          headroom.top();
        });

        it('should do nothing', function() {
          expect(headroom.onTop).not.toHaveBeenCalled();
        });

      });

    });

    describe('notTop', function() {

      beforeEach(function() {
        headroom.onNotTop = jasmine.createSpy();
      });

      describe('when top class is present', function() {

        beforeEach(function() {
          classList.contains.andReturn(false);
          headroom.notTop();
        });

        it('should remove top class', function(){
          expect(classList.remove).toHaveBeenCalledWith(headroom.classes.top);
        });

        it('should add notTop class', function(){
          expect(classList.add).toHaveBeenCalledWith(headroom.classes.notTop);
        });

        it('should invoke callback if supplied', function() {
          expect(headroom.onNotTop).toHaveBeenCalled();
        });

      });

      describe('when top class is not present', function() {

        beforeEach(function() {
          classList.contains.andReturn(true);
          headroom.notTop();
        });

        it('should do nothing', function() {
          expect(headroom.onNotTop).not.toHaveBeenCalled();
        });

      });

    });

    describe('isOutOfBounds', function() {

      var getScrollerHeight, getViewportHeight;

      beforeEach(function() {
        getViewportHeight = spyOn(headroom, 'getViewportHeight');
        getScrollerHeight = spyOn(headroom, 'getScrollerHeight');
      });

      it('return true if past top', function() {
        var result = headroom.isOutOfBounds(-1);
        expect(result).toBe(true);
      });

      it('return true if past bottom', function() {
        var documentHeight = 20;
        var viewportHeight = 20;

        getScrollerHeight.andReturn(documentHeight);
        getViewportHeight.andReturn(viewportHeight);
        var result = headroom.isOutOfBounds(viewportHeight + 1);

        expect(result).toBe(true);
      });

      it('return false if in bounds', function() {
        var documentHeight = 200;
        var viewportHeight = 20;

        getScrollerHeight.andReturn(documentHeight);
        getViewportHeight.andReturn(viewportHeight);
        var result = headroom.isOutOfBounds(10);

        expect(result).toBe(false);
      });
    });

    describe('isOutOfBounds of scroller element', function() {

      var getViewportHeight, getElementPhysicalHeight, getDocumentHeight, getElementHeight;
      var hr;

      beforeEach(function() {
        var userOpts = {
          scroller: {}
        };

        hr = new Headroom(elem, userOpts);
        getViewportHeight = spyOn(hr, 'getViewportHeight');
        getElementPhysicalHeight = spyOn(hr, 'getElementPhysicalHeight');
        getDocumentHeight = spyOn(hr, 'getDocumentHeight');
        getElementHeight = spyOn(hr, 'getElementHeight');
      });

      it('return true if past top', function() {
        var result = hr.isOutOfBounds(-1);
        expect(result).toBe(true);
      });

      it('return true if past bottom', function() {
        var elemHeight = 20;
        var elemPhysicalHeight = 20;

        getElementHeight.andReturn(elemHeight);
        getElementPhysicalHeight.andReturn(elemPhysicalHeight);
        var result = hr.isOutOfBounds(elemPhysicalHeight, 1);

        expect(result).toBe(true);
      });

      it('return false if in bounds', function() {
        var elemHeight = 200;
        var elemPhysicalHeight = 20;

        getElementHeight.andReturn(elemHeight);
        getElementPhysicalHeight.andReturn(elemPhysicalHeight);
        var result = hr.isOutOfBounds(10);

        expect(result).toBe(false);
      });

    });

    describe('getDocumentHeight', function() {

    });

    describe('getElementHeight', function() {

    });

    describe('getScrollerHeight', function() {

    });

    describe('getViewportHeight', function() {

    });

    describe('update', function() {

      var pin, unpin, shouldPin, shouldUnpin, isOutOfBounds;

      beforeEach(function() {
        pin     = spyOn(Headroom.prototype, 'pin');
        unpin   = spyOn(Headroom.prototype, 'unpin');
        shouldPin = spyOn(Headroom.prototype, 'shouldPin');
        shouldUnpin = spyOn(Headroom.prototype, 'shouldUnpin');
        isOutOfBounds = spyOn(Headroom.prototype, 'isOutOfBounds');
      });

      it('should pin if conditions are met', function() {
        shouldPin.andReturn(true);
        headroom.update();
        expect(pin).toHaveBeenCalled();
      });

      it('should unpin if conditions are met', function(){
        shouldUnpin.andReturn(true);
        headroom.update();
        expect(unpin).toHaveBeenCalled();
      });

      it('should ignore scroll values out of bounds', function() {
        shouldUnpin.andReturn(true);
        shouldPin.andReturn(true);
        isOutOfBounds.andReturn(true);

        headroom.update();

        expect(pin).not.toHaveBeenCalled();
        expect(unpin).not.toHaveBeenCalled();
      });

    });

  });

}(this));