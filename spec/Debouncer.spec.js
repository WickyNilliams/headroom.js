;(function(global){

  describe('Debouncer', function() {

    var callback, debouncer;

    beforeEach(function() {
      callback = jasmine.createSpy('callback');
      debouncer = new Debouncer(callback);
    });
    
    it('stores the supplied callback', function() {
      expect(debouncer.callback).toBe(callback);
    });

    it('initialises ticking to false', function() {
      expect(debouncer.ticking).toBe(false);
    });

    it('executes callback and sets ticking to false on update', function(){
      debouncer.ticking = true;

      debouncer.update();

      expect(callback).toHaveBeenCalled();
      expect(debouncer.ticking).toBe(false);
    });

    it('calls update and request tick when event handled', function() {
      spyOn(Debouncer.prototype, 'requestTick');

      debouncer.handleEvent();

      expect(Debouncer.prototype.requestTick).toHaveBeenCalled();
    });

    it('will not queue rAF if already ticking', function() {
      // for some reason spying on requestAnimationFrame
      // doesn't work, reported as undefined?
      var originalRAF = global.requestAnimationFrame,
        rAFSpy      = jasmine.createSpy('requestAnimationFrame');

      global.requestAnimationFrame = rAFSpy;
      spyOn(Debouncer.prototype.update, 'bind');

      debouncer.ticking = true;
      debouncer.requestTick();

      expect(global.requestAnimationFrame).not.toHaveBeenCalled();
      expect(Debouncer.prototype.update.bind).not.toHaveBeenCalled();
      expect(debouncer.ticking).toBe(true);
      
      global.requestAnimationFrame = originalRAF;
    });

    it('queues rAF only if not currently ticking', function() {
      // for some reason spying on requestAnimationFrame
      // doesn't work, reported as undefined?
      var originalRAF = global.requestAnimationFrame,
        rAFSpy      = jasmine.createSpy('requestAnimationFrame');

      global.requestAnimationFrame = rAFSpy;
      spyOn(Debouncer.prototype.update, 'bind');

      debouncer.ticking = false;
      debouncer.requestTick();

      expect(global.requestAnimationFrame).toHaveBeenCalled();
      expect(Debouncer.prototype.update.bind).toHaveBeenCalled();
      expect(debouncer.ticking).toBe(true);

      global.requestAnimationFrame = originalRAF;
    });
  });
}(this));