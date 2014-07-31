Handlebars.registerHelper('body', function(items, options) {
  var out = "";

  for (var i = 0, l = items.length; i < l; ++i) {
      out = out + "<tr>" + options.fn(items[i]) + "</tr>";
  }

  return out;
});