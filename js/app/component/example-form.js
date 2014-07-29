var exampleFormComponent = flight.component(exampleFormUIMixin, loaderMixin, function () {
    this.defaultAttrs({
        //loader
        loader: "#loader",
        //validation
        usernameError: "#username-error",
        passwordError: "#password-error",        
        showErrorDelay: 1500,
        //general
        submitButton: "submit-button",
        //for emulate errors
        delay: 5000,
        urlSelector: "url-selector",
        successUrl: "/success.json",
        errorUrl: "/error.json"
    });

    this.runAjax = function(url) {
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

    this.validation = function(form) {
        var isError = false;
        if (!form.username.value) {
            this.select("usernameError").html("Username can't be blank");
            this.select("usernameError").show(0).delay(this.attr.showErrorDelay).hide(0);
            isError = true;
        }
        if (!form.password.value) {
            this.select("passwordError").html("Password can't be blank");
            this.select("passwordError").show(0).delay(this.attr.showErrorDelay).hide(0);
            isError = true;
        }

        return !isError;
    }

    this.onSubmit = function (e, data) {
        var form = e.target;
        if (!this.validation(form)) {
            return false;
        }

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
                that.runAjax(url);
                that.trigger(that.attr.loaderHideEvent);
                form[that.attr.submitButton].disabled = false;
            },
            this.attr.delay
        );
        
        return false;
    }

    this.after("initialize", function() {
        this.on("submit", this.onSubmit)
    });
});