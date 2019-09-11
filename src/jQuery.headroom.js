export default function registerJQueryHeadroom($, Headroom) {
  ////////////
  // Plugin //
  ////////////

  $.fn.headroom = function(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("headroom");
      var options = typeof option === "object" && option;

      if (!data) {
        data = new Headroom(this, options);
        data.init();
        $this.data("headroom", data);
      }

      if (typeof option === "string") {
        data[option]();

        if (option === "destroy") {
          $this.removeData("headroom");
        }
      }
    });
  };

  //////////////
  // Data API //
  //////////////

  $("[data-headroom]").each(function() {
    var $this = $(this);
    $this.headroom($this.data());
  });
}
