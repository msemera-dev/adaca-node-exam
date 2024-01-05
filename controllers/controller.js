const db = require("../models");
const Users = db.users;

exports.addPeople = (req, res) => {
  if (!req.body.fullName) {
    res.status(400).send({ message: "Full name can not be empty!" });
    return;
  }

  const user = new Users({
    fullName: req.body.fullName,
    age: req.body.age,
    isDeveloper: req.body.isDeveloper ? req.body.isDeveloper : false
  });

  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error adding user."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No user with id found" + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}.`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Users.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}.`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};