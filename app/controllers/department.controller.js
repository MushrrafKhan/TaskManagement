const Department = require("../models/department.model.js");

// Create and Save a new department
exports.create = (req, res) => {

};

// Retrieve all departments from the database.
exports.findAll = (req, res) => {

};

// Find a single department with a departmentId
exports.findOne = (req, res) => {

};

// Update a department identified by the departmentId in the request
exports.update = (req, res) => {

};

// Delete a department with the specified departmentId in the request
exports.delete = (req, res) => {

};

// Delete all department from the database.
exports.deleteAll = (req, res) => {

};


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a department
    const department = new Department({
        status: req.body.status,
        name: req.body.name,
        branches_id: req.body.branches_id
    });

    // Save department in the database
    Department.create(department, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the department."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Department.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving department."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Department.findById(req.params.departmentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found department with id ${req.params.departmentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving department with id " + req.params.departmentId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Department.updateById(
        req.params.departmentId,
        new Department(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found department with id ${req.params.departmentId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating department with id " + req.params.departmentId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Department.remove(req.params.departmentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found department with id ${req.params.departmentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete department with id " + req.params.departmentId
                });
            }
        } else res.send({ message: `department was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Department.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all department."
            });
        else res.send({ message: `All department were deleted successfully!` });
    });
};

exports.findDep = (req, res) => {
    Department.findByBranches(req.params.branches_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found comment with task_id ${req.params.branches_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving task with task_id " + req.params.branches_id
                });
            }
        } else res.send(data);
    });
};
Array