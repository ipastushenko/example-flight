var exampleFormComponent = flight.component(exampleFormUIMixin, loaderMixin, function () {
    this.defaultAttrs({
        //loader
        loader: "#loader",
        //general message
        submitMessage: "#submit-message",
        //validation
        usernameError: "#username-error",
        passwordError: "#password-error",
        errorSufix: "Error",
        showErrorDelay: 2500,
        //general
        submitButton: "submit-button",
        //for emulate errors
        delay: 5000,
        urlSelector: "url-selector",
        successUrl: "/success.json",
        errorUrl: "/error.json"
    });

    this.runAjax = function(url) {
        var that = this;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",            
            success: function(data, textStatus, jqXHR) {
                that.trigger(
                    that.attr.showSubmitMessageEvent,
                    {success: data.success, message:data.message}
                );
                if (!data.success) {
                    that.trigger(that.attr.showDetailErrorsEvent, data.detail_errors);
                }                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                that.trigger(
                    that.attr.showSubmitMessageEvent, 
                    {success: false, message: "Can't connect to server"}
                );
            }
        });
    }

    this.validation = function(form) {
        var errors = {};
        if (!form.username.value) {
            errors['username'] = "Username can't be blank";
        }
        if (!form.password.value) {
            errors['password'] = "Username can't be blank";
        }
        if ($.isEmptyObject(errors)) {
            return true;            
        }
        this.trigger(this.attr.showDetailErrorsEvent, errors)

        return false;
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