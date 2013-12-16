(function(global){

  describe('Headroom', function(){

    var headroom, elem, classList;

    beforeEach(function() {
      classList = jasmine.createSpyObj('classList', ['add', 'remove', 'contains']);
      elem      = {
        classList : classList ,
        dispatchEvent: spyOn(window, 'dispatchEvent')
      };
      headroom  = new Headroom(elem);
    });

    describe('constructor', function() {

      var debouncer;

      beforeEach(function(){
        debouncer = spyOn(global, 'Debouncer').andCallThrough();
      });

      it('stores the arguments it is passed', function() {
        var hr = new Headroom(elem);

        expect(hr.lastKnownScrollY).toBe(0);
        expect(hr.elem).toBe(elem);
        expect(hr.debouncer).toBeDefined();
        expect(debouncer).toHaveBeenCalled();
        expect(hr.debouncer instanceof debouncer).toBeTruthy();
        expect(hr.tolerance).toBe(Headroom.options.tolerance);
        expect(hr.offset).toBe(Headroom.options.offset);
        expect(hr.classes).toBe(Headroom.options.classes);
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
      var Event;

      beforeEach(function() {
        Event = spyOn(window, 'Event');
      });

      it('should add pinned class and remove unpinned class', function(){
        headroom.pin();

        expect(classList.remove).toHaveBeenCalledWith(headroom.classes.unpinned);
        expect(classList.add).toHaveBeenCalledWith(headroom.classes.pinned);
        expect(Event).toHaveBeenCalled();
      });

    });

    describe('unpin', function() {
      var Event;

      beforeEach(function() {
        Event = spyOn(window, 'Event');
      });

      it('should add unpinned class and remove pinned class', function(){
        headroom.unpin();

        expect(classList.add).toHaveBeenCalledWith(headroom.classes.unpinned);
        expect(classList.remove).toHaveBeenCalledWith(headroom.classes.pinned);
        expect(Event).toHaveBeenCalled();
      });

    });

    describe('update', function() {

      var pin, unpin, scrollY;

      beforeEach(function() {
        scrollY = spyOn(Headroom.prototype, 'getScrollY');
        pin     = spyOn(Headroom.prototype, 'pin');
        unpin   = spyOn(Headroom.prototype, 'unpin');
      });

      it('should unpin if page has scrolled down', function(){

        scrollY.andReturn(10);

        headroom.update();

        expect(unpin).toHaveBeenCalled();
        expect(pin).not.toHaveBeenCalled();
        expect(headroom.lastKnownScrollY).toBe(10);
      });

      it('should pin if has scrolled up', function(){
        headroom.lastKnownScrollY = 20;
        scrollY.andReturn(10);

        headroom.update();

        expect(unpin).not.toHaveBeenCalled();
        expect(pin).toHaveBeenCalled();
        expect(headroom.lastKnownScrollY).toBe(10);
      });

      it('should ignore any scroll values less than zero', function() {
        scrollY.andReturn(-5);

        headroom.update();

        expect(headroom.lastKnownScrollY).toBe(0);
      });

      it('should not pin or unpin if tolerance not exceeded', function(){
        headroom.tolerance = 10;

        //scroll down
        scrollY.andReturn(headroom.tolerance - 1);
        headroom.update();

        expect(unpin).not.toHaveBeenCalled();

        //scroll up
        scrollY.andReturn(1);
        headroom.update();

        expect(pin).not.toHaveBeenCalled();
      });

      it('should unpin if offset exceeded', function(){
        headroom.offset = 100;

        //scroll down
        scrollY.andReturn(50);
        headroom.update();

        expect(unpin).not.toHaveBeenCalled();

        //scroll up
        scrollY.andReturn(110);
        headroom.update();

        expect(unpin).toHaveBeenCalled();
      });

    });

  });

}(this));