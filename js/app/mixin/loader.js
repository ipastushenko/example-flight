var Loader = function () {    
    this.on_show = function (e) {
        $(this.attr.loader).css("visibility", "visible");
    }

    this.on_hide = function (e) {
        $(this.attr.loader).css("visibility", "hidden");
    }

    this.after("initialize", function() {
        this.on("showLoader", this.on_show);
        this.on("hideLoader", this.on_hide);
    });
}