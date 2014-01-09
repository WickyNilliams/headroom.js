(function(global){

  describe('Debouncer', function() {

    var callback, debouncer;

    beforeEach(function() {
      callback = jasmine.createSpy('callback');
      debouncer = new Debouncer(callback);
    });

    describe('constructor', function() {

      it('stores the supplied callback', function() {
        expect(debouncer.callback).toBe(callback);
      });

      it('initialises ticking to false', function() {
        expect(debouncer.ticking).toBe(false);
      });

    });

    describe('update', function() {

      it('executes callback and sets ticking to false', function(){
        debouncer.ticking = true;

        debouncer.update();

        expect(callback).toHaveBeenCalled();
        expect(debouncer.ticking).toBe(false);
      });

    });
    

    describe('handleEvent', function() {
      
      it('calls update and requests tick', function() {
        var rt = spyOn(Debouncer.prototype, 'requestTick');

        debouncer.handleEvent();

        expect(rt).toHaveBeenCalled();
      });

    });


    describe('requestTick', function() {

      var originalRAF, rAF, bind;

      beforeEach(function() {
        originalRAF = global.requestAnimationFrame;
        global.requestAnimationFrame = rAF = jasmine.createSpy('requestAnimationFrame');
        bind = spyOn(Debouncer.prototype.update, 'bind');
      });

      afterEach(function() {
        global.requestAnimationFrame = originalRAF;
      });

      it('will not queue rAF if already ticking', function() {
        debouncer.ticking = true;
        debouncer.requestTick();

        expect(rAF).not.toHaveBeenCalled();
        expect(bind).not.toHaveBeenCalled();
        expect(debouncer.ticking).toBe(true);
      });

      it('queues rAF if not currently ticking', function() {
        debouncer.ticking = false;
        debouncer.requestTick();

        expect(rAF).toHaveBeenCalled();
        expect(bind).toHaveBeenCalled();
        expect(debouncer.ticking).toBe(true);
      });

      it('caches the rAF callback', function() {
        debouncer.ticking = false;
        
        debouncer.requestTick();
        debouncer.requestTick();

        expect(bind.calls.length).toBe(1);
      });

    });

  });
}(this));