var ExampleForm = flight.component(Loader, function () {
    this.defaultAttrs({
        loader: "#loader",
        loaderShowEvent: "showLoader",
        loaderHideEvent: "hideLoader",
        submitButton: "submit-button",
        delay: 5000,
        urlSelector: "url-selector",
        successUrl: "/success.json",
        errorUrl: "/error.json"
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
        if (form[this.attr.urlSelector].checked) {
            url = this.attr.errorUrl;
        } else {
            url = this.attr.successUrl;
        }        

        form[this.attr.submitButton].disabled = true;
        this.trigger(this.attr.loaderShowEvent);
        that = this;
        setTimeout(
            function() {
                that.run_ajax(url);
                that.trigger(that.attr.loaderHideEvent);
                form[that.attr.submitButton].disabled = false;
            },
            this.attr.delay
        );
        
        return false;
    }

    this.after("initialize", function() {
        this.on("submit", this.on_submit)
    });
});