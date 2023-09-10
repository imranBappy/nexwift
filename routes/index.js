const routes = [
  { path: "/auth", router: require("./authRoutes.js") },
  { path: "/", router: require("./homeRoutes.js") },
  { path: "/dashboard", router: require("./dashboardRoutes.js") },
  { path: "/contact", router: require("./contactRoutes.js") },
];

const setRoutes = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};

module.exports = setRoutes;
