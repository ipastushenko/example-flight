var exampleTableComponent = flight.component(exampleTableUIMixin, loaderMixin, paginatorMixin, function() {
	this.defaultAttrs({
		//general
		tableSelector: "#table",
		tableTemplate: "#table-template",
		//loader
		loader: "#table-loader",
		//for pagination
		paginateSelector: "#table-paginator",
		paginateTemplate: "#paginator-template",
		tableReloadEvent: "tableReloadEvent",
		pageSelector: ".js-page",

		delay: 1000,
		defaultPage: 1
	})

	this.onReload = function(e, data) {
		this.trigger(this.attr.loaderShowEvent);
		that = this;
        setTimeout(
            function() {
                that.runAjax(e, data);
                that.trigger(that.attr.loaderHideEvent);
            },
            this.attr.delay
        );
	}

	this.runAjax = function(e, data) {
		var pageNumber = data;
		var table = this.select("tableSelector");
		var urlPrefix = table.data("url-prefix");
		var urlPostfix = table.data("url-postfix");
		var url = urlPrefix + pageNumber + urlPostfix;

		var that = this;
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				var countPages = data.table.total / data.table.perPage;
				if (data.table.total % data.table.perPage != 0) {
					countPages += 1;
				}
				if (data.table.total == 0) {
					countPages += 1;	
				}
				that.trigger(that.attr.showTableEvent, data.table);
				that.trigger(that.attr.showPagesEvent, countPages);                
            },
            error: function(jqXHR, textStatus, errorThrown) {
            	alert("Error!!!");
            }
		});
	}

	this.after("initialize", function() {
		this.on(this.attr.tableReloadEvent, this.onReload);
		this.trigger(this.attr.tableReloadEvent, this.attr.defaultPage);
    });
});