const sql = require("./db.js");

//constructor
const Company = function (company){
    var datetime = new Date();
    this.name = company.name;
    this.account_holder = company.account_holder;
    this.logo = company.logo;
    this.country_id = company.country_id;
    this.state_id = company.state_id;
    this.city_id = company.city_id;
    this.address = company.address;
    this.registration_date = datetime;
    this.status = company.status;
    this.fax = company.fax;
    this.email = company.email;
    this.reg_number = company.reg_number;
    this.pan_number = company.pan_number;
    this.tan_number = company.tan_number;
    this.empcode_prefix = company.empcode_prefix;
    this.contact_number_1 = company.contact_number_1;
    this.contact_number_2 = company.contact_number_2;
    this.contact_number_3 = company.contact_number_3;
    this.nature_of_business = company.nature_of_business;
    this.legal_entity = company.legal_entity;
    this.created_at = datetime;
    this.updated_at = company.updated_at;
    this.is_completed = company.is_completed;

}

Company.create = (newCompany, result) => {
    sql.query("INSERT INTO company SET ?", newCompany, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created company: ", { id: res.insertId, ...newCompany });
      result(null, { id: res.insertId, ...newCompany });
    });
  };

Company.findById = (companyId, result) => {
    sql.query(`SELECT state.title AS state, city.title AS city, company.name, company.logo, company.address, company.registration_date, company.email, company.pan_number,  company.contact_number_1 FROM company LEFT JOIN country ON country.id = company.country_id LEFT JOIN state ON state.id = company.state_id LEFT JOIN city ON city.id = company.city_id WHERE company.id = ${companyId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found company: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found company with the id
      result({ kind: "not_found" }, null);
    });
  };

Company.getAll = result => {
    sql.query("SELECT * FROM company", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("company: ", res);
      result(null, res);
    });
  };

Company.updateById = (id, company, result) => {
    sql.query(
      "UPDATE company SET name = ?, account_holder = ?, logo = ?, country_id = ?, state_id = ?, city_id = ?, address = ?, registration_date = ?, status = ?, fax = ?, email = ?, reg_number = ?, pan_number = ?, tan_number = ?, empcode_prefix = ?, contact_number_1 = ?, contact_number_2 = ?, contact_number_3 = ?, nature_of_business = ?, legal_entity = ?, created_at = ?, updated_at = ?, is_completed = ? WHERE id = ?",
      [company.name, company.account_holder, company.logo, company.country_id, company.state_id,company.city_id, company.address, company.registration_date, company.status, company.fax, company.email, company.reg_number, company.pan_number, company.tan_number, company.emcode_prefix, company.contact_number_1, company.contact_number_2, company.contact_number_3, company.nature_of_business, company.legal_entity, company.created_at, company.updated_at, company.is_completed, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found company with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated company: ", { id: id, ...company });
        result(null, { id: id, ...company });
      }
    );
  };

Company.remove = (id, result) => {
    sql.query("DELETE FROM company WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found company with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted company with id: ", id);
      result(null, res);
    });
  };

Company.removeAll = result => {
    sql.query("DELETE FROM company", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} company`);
      result(null, res);
    });
  };

  module.exports = Company;  