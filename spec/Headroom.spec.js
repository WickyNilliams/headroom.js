;(function(global){

  describe('Headroom', function(){

    var headroom, elem, classList;

    beforeEach(function() {
      spyOn(global, 'Debouncer').andCallThrough();
      classList = jasmine.createSpyObj('classList', ['add', 'remove', 'contains']);
      elem = {classList : classList};
      headroom = new Headroom(elem);
      window.scrollY = 0;
    });

    it('stores the arguments passed to the constructor', function() {
      expect(headroom.lastKnownScrollY).toBe(0);
      expect(headroom.elem).toBe(elem);
      expect(headroom.debouncer).toBeDefined();
      expect(global.Debouncer).toHaveBeenCalled();
      expect(headroom.debouncer instanceof global.Debouncer).toBeTruthy();
      expect(headroom.tolerance).toBe(Headroom.options.tolerance);
      expect(headroom.offset).toBe(Headroom.options.offset);
      expect(headroom.classes).toBe(Headroom.options.classes);
    });

    it('should add an initial class and bind the scroll event when initialised', function() {
      spyOn(global, 'setTimeout');
      spyOn(Headroom.prototype.attachEvent, 'bind').andReturn(function(){});

      headroom.init();

      expect(classList.add).toHaveBeenCalledWith(headroom.classes.initial);
      expect(Headroom.prototype.attachEvent.bind).toHaveBeenCalled();
      expect(global.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 100);
    });

    it('should clean up after itself when destroyed', function() {
      var eventHandler;

      spyOn(global, 'removeEventListener');
      headroom.eventHandler = eventHandler = function() {};

      headroom.destroy();

      expect(classList.remove).toHaveBeenCalled();
      expect(global.removeEventListener).toHaveBeenCalledWith('scroll', eventHandler, false);
      expect(headroom.eventHandler).toBeNull();
    });

    it('should set classes correctly when pinning', function(){
      headroom.pin();

      expect(classList.remove).toHaveBeenCalledWith(headroom.classes.unpinned);
      expect(classList.add).toHaveBeenCalledWith(headroom.classes.pinned);
    });

    it('should set classes correctly when unpinning', function(){
      headroom.unpin();

      expect(classList.add).toHaveBeenCalledWith(headroom.classes.unpinned);
      expect(classList.remove).toHaveBeenCalledWith(headroom.classes.pinned);
    });

    it('should correctly attach a scroll event', function(){
      var debouncedFunction = function(){},
        fakeDebouncer = {
          handleEvent : {
            bind : jasmine.createSpy('bind').andReturn(debouncedFunction)
          }
        };

      spyOn(global, 'addEventListener');
      expect(this.eventHandler).toBeUndefined();

      headroom.debouncer = fakeDebouncer;

      headroom.attachEvent();
      headroom.attachEvent();

      expect(headroom.eventHandler).toBeDefined();
      expect(fakeDebouncer.handleEvent.bind).toHaveBeenCalled();
      expect(global.addEventListener).toHaveBeenCalledWith('scroll', debouncedFunction, false);
      expect(global.addEventListener.calls.length).toBe(1);
    });

    it('should unpin if moving down', function(){
      spyOn(Headroom.prototype, 'unpin');
      spyOn(Headroom.prototype, 'pin');
      global.scrollY = 10;

      headroom.update();

      expect(Headroom.prototype.unpin).toHaveBeenCalled();
      expect(Headroom.prototype.pin).not.toHaveBeenCalled();
      expect(headroom.lastKnownScrollY).toBe(10);
    });

    it('should pin if moving up', function(){
      spyOn(Headroom.prototype, 'unpin');
      spyOn(Headroom.prototype, 'pin');

      headroom.lastKnownScrollY = 20;
      global.scrollY = 10;
      headroom.update();

      expect(Headroom.prototype.unpin).not.toHaveBeenCalled();
      expect(Headroom.prototype.pin).toHaveBeenCalled();
      expect(headroom.lastKnownScrollY).toBe(10);
    });

    it('should ignore any scroll values less than zero', function() {
      global.scrollY = -5;

      headroom.update();

      expect(headroom.lastKnownScrollY).toBe(0);
    });

    it('should not attempt to pin or unpin if tolerance not exceeded', function(){
      spyOn(Headroom.prototype, 'unpin');
      spyOn(Headroom.prototype, 'pin');

      headroom.tolerance = 10;

      //scroll down
      window.scrollY = headroom.tolerance - 1;
      headroom.update();

      expect(Headroom.prototype.unpin).not.toHaveBeenCalled();

      //scroll up
      window.scrollY = 1;
      headroom.update();

      expect(Headroom.prototype.pin).not.toHaveBeenCalled();
    });

    it('should only unpin if offset exceeded', function(){
      spyOn(Headroom.prototype, 'unpin');
      spyOn(Headroom.prototype, 'pin');

      headroom.offset = 100;

      //scroll down
      window.scrollY = 50;
      headroom.update();

      expect(Headroom.prototype.unpin).not.toHaveBeenCalled();

      //scroll up
      window.scrollY = 110;
      headroom.update();

      expect(Headroom.prototype.unpin).toHaveBeenCalled();
    });
  });

}(this));