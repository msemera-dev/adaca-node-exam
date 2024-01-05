module.exports = app => {
    const controller = require("../controllers/controller.js");
    var router = require("express").Router();
  
    router.post("/", controller.addPeople);
    router.get("/:id", controller.findOne);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
    app.use("/api/users", router);
  };