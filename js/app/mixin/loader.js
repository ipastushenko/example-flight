var loaderMixin = function () {    
    this.onShow = function (e, data) {
        this.select("loader").css("visibility", "visible");
    }

    this.onHide = function (e, data) {
        this.select("loader").css("visibility", "hidden");
    }

    this.after("initialize", function() {
        this.on("showLoader", this.onShow);
        this.on("hideLoader", this.onHide);
    });
}