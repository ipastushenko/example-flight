var exampleFormUIMixin = function () {
	this.defaultAttrs({
        showSubmitMessageEvent: "showSubmitMessage",
        showDetailErrorsEvent: "showDetailErrorsEvent"
    });

    this.onShowSubmitMessage = function (e, data) {
    	var message = this.select("submitMessage");
    	message.removeClass("bg-danger");
    	message.removeClass("bg-success");
    	if (data.success) {
    		message.addClass("bg-success");
    	} else {
    		message.addClass("bg-danger");
    	}
    	message.html(data.message);
    	message.css("visibility", "visible");
    }

    this.onShowDetailErrors = function (e, data) {
		var keys = Object.keys(data);
    	for (var i = 0; i < keys.length; ++i) {
    		this.select(keys[i] + this.attr.errorSufix).html(data[keys[i]]);
    		this.select(keys[i] + this.attr.errorSufix).show(0).delay(this.attr.showErrorDelay).hide(0);
    	}
    }

    this.after("initialize", function() {
        this.on(this.attr.showSubmitMessageEvent, this.onShowSubmitMessage);
        this.on(this.attr.showDetailErrorsEvent, this.onShowDetailErrors);
    });
}