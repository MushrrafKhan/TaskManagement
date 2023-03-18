sql.query(`SELECT * FROM comment WHERE task_id = ${res[0].id}`, (err, data) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
    if (data.length) {
        console.log("TEST", res);
        var response = {
            data: {
                task: res[0],
                comments: data
            },
            status: true,
            msg: "successfully data "
        }
        result(null, response);
        return;
    }

    // not found data with the id
    result({ kind: "not_found" }, null);
});