var loaderMixin = function () {
    this.defaultAttrs({
        loaderShowEvent: "showLoader",
        loaderHideEvent: "hideLoader"
    });
    this.onShow = function (e, data) {
        this.select("loader").css("visibility", "visible");
    }

    this.onHide = function (e, data) {
        this.select("loader").css("visibility", "hidden");
    }

    this.after("initialize", function() {
        this.on(this.attr.loaderShowEvent, this.onShow);
        this.on(this.attr.loaderHideEvent, this.onHide);
    });
}