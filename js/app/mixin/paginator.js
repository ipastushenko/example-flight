var paginatorMixin = function () {
	this.defaultAttrs({
        showPagesEvent: "showPages"
    });

	this.onShowPages = function (e, data) {
		var count = data;
		var source = this.select("paginateTemplate").html();
		var template = Handlebars.compile(source);
		var pages = [];
		for (var i = 1; i <= count; ++i) {
			pages[pages.length] = {
				url: "javascript:void(0)",
				pageNumber: i,
				name: i
			}
		}
		var context = {pages: pages};
		this.select("paginateSelector").html(template(context));
		this.on(this.attr.pageSelector, "click", this.onClickPage);
	}

	this.onClickPage = function (e, data) {
		var page = $(e.target);
		this.trigger(this.attr.tableReloadEvent, page.data("page-number"));
		return false;
	}

	this.after("initialize", function() {
        this.on(this.attr.showPagesEvent, this.onShowPages);
        this.on(this.attr.pageSelector, "click", this.onClickPage);
    });
}