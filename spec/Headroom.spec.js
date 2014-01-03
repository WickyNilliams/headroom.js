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
        expect(hr.debouncer).toBeDefined();
        expect(debouncer).toHaveBeenCalled();
        expect(hr.debouncer instanceof debouncer).toBeTruthy();
        expect(hr.tolerance).toBe(Headroom.options.tolerance);
        expect(hr.offset).toBe(Headroom.options.offset);
        expect(hr.classes).toBe(Headroom.options.classes);
        expect(hr.onPin).toBe(onPin);
        expect(hr.onUnpin).toBe(onUnpin);
      });

      it('merges the options arguments properly', function() {
        var userOpts = {
          tolerance : 30,
          classes : {
            initial : 'hr'
          }
        };

        var hr = new Headroom(elem, userOpts);

        expect(hr.tolerance).toBe(userOpts.tolerance);
        expect(hr.offset).toBe(Headroom.options.offset);
        expect(hr.classes.initial).toBe(userOpts.classes.initial);
        expect(hr.classes.pinned).toBe(Headroom.options.classes.pinned);
      });

    });

    describe('init', function() {

      var st, bind;

      beforeEach(function() {
        st   = spyOn(global, 'setTimeout');
        bind = spyOn(Headroom.prototype.attachEvent, 'bind').andReturn(function(){});
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

        expect(classList.remove).toHaveBeenCalled();
        expect(removeEventListener).toHaveBeenCalledWith('scroll', headroom.debouncer, false);
        expect(headroom.initialised).toBe(false);
      });

    });

    describe('attachEvent', function() {
      var addEventListener;

      beforeEach(function() {
        addEventListener = spyOn(global, 'addEventListener');
      });

      it('should attach listener for scroll event', function(){
        headroom.attachEvent();

        expect(headroom.initialised).toBe(true);
        expect(global.addEventListener).toHaveBeenCalledWith('scroll', headroom.debouncer, false);
      });

      it('will only ever add one listener', function() {
        headroom.attachEvent();
        headroom.attachEvent();

        expect(addEventListener.calls.length).toBe(1);
      });

    });

    describe('pin', function() {

      it('should add pinned class and remove unpinned class', function(){
        headroom.pin();

        expect(classList.remove).toHaveBeenCalledWith(headroom.classes.unpinned);
        expect(classList.add).toHaveBeenCalledWith(headroom.classes.pinned);
      });

      it('should invoke callback if supplied', function() {
        headroom.onPin = jasmine.createSpy();

        headroom.pin();

        expect(headroom.onPin).toHaveBeenCalled();
      });

    });

    describe('unpin', function() {

      it('should add unpinned class and remove pinned class', function(){
        headroom.unpin();

        expect(classList.add).toHaveBeenCalledWith(headroom.classes.unpinned);
        expect(classList.remove).toHaveBeenCalledWith(headroom.classes.pinned);
      });

      it('should invoke callback if supplied', function() {
        headroom.onUnpin = jasmine.createSpy();

        headroom.unpin();

        expect(headroom.onUnpin).toHaveBeenCalled();
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

    describe('isOutOfBounds', function() {

      var getDocumentHeight, getViewportHeight;

      beforeEach(function() {
        getViewportHeight = spyOn(headroom, 'getViewportHeight');
        getDocumentHeight = spyOn(headroom, 'getDocumentHeight');
      });

      it('return true if past bottom', function() {
        var result = headroom.isOutOfBounds(-1);
        expect(result).toBe(true);
      });

      it('return true if past top', function() {
        getViewportHeight.andReturn(2);
        getDocumentHeight.andReturn(2);

        var result = headroom.isOutOfBounds(1);

        expect(result).toBe(true);
      });
    });

    describe('getDocumentHeight', function() {
      
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