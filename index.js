var app = require("./config/express");
var routes = require("./config/routes");
routes(app);
app.listen(3000);