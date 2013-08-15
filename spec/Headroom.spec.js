/*global describe: false, beforeEach: false, it: false, expect: false, jasmine: false, spyOn: false, Headroom:false */
;(function(global){

	describe('Headroom', function(){

		var headroom, elem, classList;

		beforeEach(function() {
			spyOn(global, 'Debouncer').andCallThrough();
			classList = jasmine.createSpyObj('classList', ['add', 'remove', 'contains']);
			elem = {classList : classList};
			headroom = new Headroom(elem);
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
			spyOn(global, 'removeEventListener');

			headroom.destroy();

			expect(classList.remove).toHaveBeenCalled();
			expect(global.removeEventListener).toHaveBeenCalledWith('scroll', headroom.eventHandler, false);
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

		it('should respect the tolerance and offset values', function() {
			//no tolerance or offset
			expect(headroom.toleranceAndOffsetExceeded(1)).toBeTruthy();
			
			//tolerance, no offset
			headroom.tolerance = 5;
			expect(headroom.toleranceAndOffsetExceeded(4)).toBeFalsy();
			expect(headroom.toleranceAndOffsetExceeded(6)).toBeTruthy();

			//tolerance and offset
			headroom.offset = 10;
			expect(headroom.toleranceAndOffsetExceeded(9)).toBeFalsy();
			expect(headroom.toleranceAndOffsetExceeded(10)).toBeTruthy();
		});

		//TODO: clean up repetition in these test (nested describe?)

		it('should only update if tolerance and offset are exceeded', function(){
			spyOn(Headroom.prototype, 'toleranceAndOffsetExceeded').andReturn(false);
			spyOn(Headroom.prototype, 'unpin');
			spyOn(Headroom.prototype, 'pin');

			global.scrollY = 10;
			headroom.update();

			expect(Headroom.prototype.toleranceAndOffsetExceeded).toHaveBeenCalled();
			expect(Headroom.prototype.unpin).not.toHaveBeenCalled();
			expect(Headroom.prototype.pin).not.toHaveBeenCalled();
			expect(headroom.lastKnownScrollY).toBe(10);
		});

		it('should unpin if moving down', function(){
			spyOn(Headroom.prototype, 'toleranceAndOffsetExceeded').andReturn(true);
			spyOn(Headroom.prototype, 'unpin');
			spyOn(Headroom.prototype, 'pin');
			global.scrollY = 10;

			headroom.update();

			expect(Headroom.prototype.toleranceAndOffsetExceeded).toHaveBeenCalled();
			expect(Headroom.prototype.unpin).toHaveBeenCalled();
			expect(Headroom.prototype.pin).not.toHaveBeenCalled();
			expect(headroom.lastKnownScrollY).toBe(10);
		});

		it('should pin if moving up and not bouncing', function(){
			spyOn(Headroom.prototype, 'toleranceAndOffsetExceeded').andReturn(true);
			spyOn(Headroom.prototype, 'unpin');
			spyOn(Headroom.prototype, 'pin');

			headroom.lastKnownScrollY = 20;
			global.scrollY = 10;
			headroom.update();

			expect(Headroom.prototype.toleranceAndOffsetExceeded).toHaveBeenCalled();
			expect(Headroom.prototype.unpin).not.toHaveBeenCalled();
			expect(Headroom.prototype.pin).toHaveBeenCalled();
			expect(headroom.lastKnownScrollY).toBe(10);
		});

		it('should not pin if moving up and bouncing', function() {
			spyOn(Headroom.prototype, 'toleranceAndOffsetExceeded').andReturn(true);
			spyOn(Headroom.prototype, 'unpin');
			spyOn(Headroom.prototype, 'pin');

			headroom.lastKnownScrollY = -5;
			global.scrollY = -2;
			headroom.update();

			expect(Headroom.prototype.toleranceAndOffsetExceeded).toHaveBeenCalled();
			expect(Headroom.prototype.unpin).not.toHaveBeenCalled();
			expect(Headroom.prototype.pin).not.toHaveBeenCalled();
			expect(headroom.lastKnownScrollY).toBe(-2);
		});
	});

}(this));