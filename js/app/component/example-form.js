var ExampleForm = flight.component(function () {
    this.defaultAttrs({
        prefixUrl: "/",
        postfixUrl: ".json",
    });

    this.on_submit = function (e) {
        var form = e.target;
        var url = this.attr.prefixUrl + form.url.value + this.attr.postfixUrl;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",            
            success: function(data, textStatus, jqXHR) {
                if (data.success) {
                    alert("Url: " + url + ", Success");
                }
                else {
                    alert("Url: " + url + ", Error: " + data.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Url: " + url + ", Error: " + errorThrown);
            }
        });
        return false;
    }

    this.after("initialize", function() {
        this.on("submit", this.on_submit)
    });
});