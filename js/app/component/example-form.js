var ExampleForm = flight.component(function () {
    this.defaultAttrs({
        prefixUrl: "/",
        postfixUrl: ".json",
    });

    this.on_submit = function (e, data) {
        var url = this.attr.prefixUrl + e.target.url.value + this.attr.postfixUrl;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json"
        }).done(function(data, textStatus, jqXHR) {
            if (data.success) {
                alert("Url: " + url + ", Success");
            }
            else {
                alert("Url: " + url + ", Error: " + data.error);
            }
        }).fail(function(jqXHR, textStatus, error) {
            alert("Url: " + url + ", Error: " + error);
        });     
        return false;
    }

    this.after("initialize", function() {
        this.on("submit", this.on_submit)
    });
});