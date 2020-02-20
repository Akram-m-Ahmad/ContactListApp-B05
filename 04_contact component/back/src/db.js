import sqlite from "sqlite";

const initializeDatabase = async () => {
  const db = await sqlite.open("./db.sqlite");

  const getContacts = async orderBy => {
    let stmt = "SELECT contact_id AS id, name, email FROM contacts";
    switch (orderBy) {
      case "name":
        stmt += " order by name desc";
        break;
      case "email":
        stmt += " order by email desc";
        break;
      default:
        break;
    }
    try {
      const rows = await db.all(stmt);
      if (rows.length == 0) {
        throw new Error("Contacts are empty!");
      }
      return rows;
    } catch (err) {
      throw new Error("Could not retrieve list of contacts");
    }
  };

  const getContactByID = async id => {
    try {
      const rows = await db.all(
        `SELECT contact_id AS id, name, email FROM contacts where contact_id=${id}`
      );
      if (rows.length == 0) {
        throw new Error(`Contact with id ${id} is not found`);
      }
      return rows;
    } catch (err) {
      throw new Error("Could not retrieve contact");
    }
  };

  const createContact = async props => {
    const { name, email } = props;
    if (!props || !name || !email) {
      throw new Error(`You must provide a name and email`);
    }
    try {
      const result = await db.run(
        `Insert into contacts (name, email) values ('${name}', '${email}')`
      );
      return result.stmt.lastID;
    } catch (err) {
      throw new Error("This combination doesnt work");
    }
  };

  const deleteContact = async id => {
    try {
      const result = await db.run(
        `Delete from contacts where contact_id = ${id}`
      );
      if (result.stmt.changes == 0) {
        throw new Error(`Contact with id ${id} doesnt exist`);
      }
      return true;
    } catch (err) {
      throw new Error(`Could not delete contact with id ${id}` + err);
    }
  };

  const updateContact = async (id, props) => {
    const { name, email } = props;
    if (!props && !(props.name && props.email)) {
      throw new Error(`You must provide a name or an email`);
    }

    let stmt = "";
    if (name && email) {
      stmt = `update contacts set name = '${name}', email = '${email}' where contact_id = ${id} `;
      console.log(stmt);
    } else if (name && !email) {
      stmt = `update contacts set name = '${name}' where contact_id = ${id} `;
    } else {
      stmt = `update contacts set  email = '${email}' where contact_id = ${id} `;
    }
    try {
      const result = await db.run(stmt);
      console.log(result);
      if (result.stmt.changes == 0) {
        throw new Error(`Contact with id ${id} doesnt exist`);
      }
      return true;
    } catch (err) {
      throw new Error(`Could not update contact with id ${id}` + err);
    }
  };

  const controller = {
    getContacts,
    createContact,
    deleteContact,
    updateContact,
    getContactByID
  };

  return controller;
};

export default initializeDatabase;
