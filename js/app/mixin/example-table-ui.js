var exampleTableUIMixin = function () {
	this.defaultAttrs({
		showTableEvent: "showTable"
	})

	this.onShowTable = function(e, data) {
		var table = data;
		var source = this.select("tableTemplate").html();
		var template = Handlebars.compile(source);
		var html = template(table);
		this.select("tableSelector").html(html);
		return false;
	}

	this.after("initialize", function() {
		this.on(this.attr.showTableEvent, this.onShowTable);
    });
}