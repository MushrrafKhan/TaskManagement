const Project = require("../models/project.model.js");

// Create and Save a new project
exports.create = (req, res) => {

};

// Retrieve all projects from the database.
exports.findAll = (req, res) => {

};

// Find a single project with a projectId
exports.findOne = (req, res) => {

};

// Update a project identified by the projectId in the request
exports.update = (req, res) => {

};

// Delete a project with the specified projectId in the request
exports.delete = (req, res) => {

};

// Delete all projects from the database.
exports.deleteAll = (req, res) => {

};


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a project
    const project = new Project({
        title: req.body.title,
        status: req.body.status,
        end_date: req.body.end_date,
        project_head: req.body.project_head,
        // contact_person_id: req.body.contact_person_id,
        close_date: req.body.close_date,
        start_date: req.body.start_date,
        due_date: req.body.due_date,
        description: req.body.description,
        // created_at: req.body.created_at,
        //update_date: req.body.update_date,
        created_by: req.body.created_by
    });

    // Save Customer in the database
    Project.create(project, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the project."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Project.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving projects."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Project.findById(req.params.projectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found project with id ${req.params.projectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving project with id " + req.params.projectId
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

    Project.updateById(
        req.params.projectId,
        new Project(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found project with id ${req.params.projectId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating project with id " + req.params.projectId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Project.remove(req.params.projectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found project with id ${req.params.projectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete project with id " + req.params.projectId
                });
            }
        } else res.send({ message: `project was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Project.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all project."
            });
        else res.send({ message: `All project were deleted successfully!` });
    });
};

exports.getProjectlimited = (req, res) => {
    Project.getProjectLimited((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving projects."
            });
        else res.send(data);
    });
};