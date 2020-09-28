const { createContainer } = require('awilix');
const container = createContainer();

require("./controllers.container")(container);
require("./externs.containers")(container);
require("./middlewares.container")(container);
require("./repositories.container")(container);
require("./routers.container")(container);
require("./services.container")(container);
require("./startups.container")(container);

module.exports = container;