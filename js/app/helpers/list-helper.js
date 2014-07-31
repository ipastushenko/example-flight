Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul class='list-inline'>";

  for(var i = 0, l = items.length; i < l; ++i) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});