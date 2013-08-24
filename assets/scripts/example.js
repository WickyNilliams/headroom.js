;(function(Headroom) {
  //TODO: should these be read from HTML?
  var styles = {
    fade : {
      initial : 'fade',
      pinned : 'fade--in',
      unpinned : 'fade--out'
    },
    slide : {
      initial : 'slide',
      pinned : 'slide--reset',
      unpinned : 'slide--up'
    },
    exitLeft : {
      initial : 'exit',
      pinned : 'exit--reset',
      unpinned : 'exit--left'
    },
    exitRight : {
      initial : 'exit',
      pinned : 'exit--reset',
      unpinned : 'exit--right'
    },
    ipsum : {
      initial : 'ipsum',
      pinned : 'ipsum--in',
      unpinned : 'ipsum--out'
    },
    dolor : {
      initial : 'dolor',
      pinned : 'dolor--in',
      unpinned : 'dolor--out'
    }
  };

  var form = {
    tolerance  : document.querySelector('#tolerance'),
    offset : document.querySelector('#offset'),
    style : document.querySelector('input[name=style][checked]'),
    getStyle : function() {
      return styles[this.style.value];
    }
  };

  var header = document.getElementById('header');
  var headroom = new Headroom(header, {
    tolerance : form.tolerance.value,
    offset : form.offset.value,
    classes : form.getStyle()
  });
  headroom.init();

  form.tolerance.addEventListener('change',function() {
    headroom.tolerance = form.tolerance.value;
  });
  form.offset.addEventListener('change', function() {
    headroom.offset = form.offset.value;
  });
  function handleStyleChange() {
    //TODO: can this be cleaned up? Too aware of internal implementation details
    form.style = this;
    headroom.destroy();
    headroom.classes = form.getStyle();
    headroom.init();
  }

  var allStyles = document.querySelectorAll('input[name=style]');
  for (var i = allStyles.length - 1; i >= 0; i--) {
    allStyles[i].addEventListener('change', handleStyleChange);
  }

}(window.Headroom));