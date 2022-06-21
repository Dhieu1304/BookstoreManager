Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
 });

 Handlebars.registerHelper('sumInt', function (a, b) {
return parseInt(a) + parseInt(b);
});