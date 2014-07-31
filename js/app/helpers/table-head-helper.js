Handlebars.registerHelper('head', function(columns, options) {
  var out = "<tr>";

  for (var i = 0, l = columns.length; i < l; ++i) {
      out = out + "<th>" + options.fn(columns[i]) + "</th>";
  }

  return out + "</tr>";
});