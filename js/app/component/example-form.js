var ExampleForm = flight.component(function () {
    this.defaultAttrs({
        successUrl: "/success.json",
        errorUrl: "/error.json",
        delay: 5000
    });

    this.run_ajax = function(url) {
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
    }

    this.on_submit = function (e) {
        var form = e.target;
        var url;
        if (form['with-errors'].checked) {
            url = this.attr.errorUrl;
        } else {
            url = this.attr.successUrl;
        }
        that = this;
        setTimeout(
            function() {
                that.run_ajax(url);
            },
            this.attr.delay
        );
        return false;
    }

    this.after("initialize", function() {
        this.on("submit", this.on_submit)
    });
});