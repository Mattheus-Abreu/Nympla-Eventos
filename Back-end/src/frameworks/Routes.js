const { Router } = require("express");
const UserController = require("../adapters/controllers/UserController");
const Autheticate = require("./AutheticateToken")
const EventController = require("../adapters/controllers/EventController");
const Authorize = require("./AuthorizeUser");
const SubscriptionController = require("../adapters/controllers/SubscriptionController");

const routes = Router();
//User Routes 
routes.get("/user/all", UserController.getAllUsers);
routes.post("/user/register", UserController.registerUser);
routes.post("/user/login", UserController.loginUser);

//Event Routes
routes.get("/event/all", EventController.getAllEvents);
routes.get("/event/:search", EventController.getEventBySearch);


//Authentication Routes
routes.post("/auth/profile", Autheticate, Authorize("user"), UserController.profileUser);
routes.post("/auth/admin", Autheticate, Authorize("admin"), UserController.adminUser);

//Subscription Routes
routes.get("/subscription/all", SubscriptionController.getAllSubscriptions);
routes.get("/subscription/user/:id", Autheticate, Authorize("user"), SubscriptionController.getSubscriptionById);
routes.post("/subscription", Autheticate, Authorize("user"), SubscriptionController.createSubscription);
routes.put("/subscription/:id", SubscriptionController.updateSubscription);
routes.delete("/subscription/delete", Autheticate, Authorize("user"), SubscriptionController.deleteSubscription);
routes.get("/admin/subscriptionsEvent/:id", Autheticate, Authorize("admin"), SubscriptionController.getSubscribeEvent);


module.exports = routes;
