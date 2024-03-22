import record from "../model/input.js";
import sequelize from "../database/connection.js";

export const addrecord = async (req, res) => {
  const { username, language, stdin, code } = req.body;

  // if (username && language && stdin && code) {
  //   return res.status(400).json({ error: "All fields are required" });
  // }

  // Insert the new user into  the database
  const sql =
    "INSERT INTO records (username, language, stdin, code) VALUES (?, ?, ?, ?)";
  const values = [username, language, stdin, code];

  // Execute the query
  sequelize
    .query(sql, {
      replacements: values,
      type: sequelize.QueryTypes.INSERT,
    })
    .then((results) => {
      console.log("Record inserted successfully:", results);
    })
    .catch((error) => {
      console.error("Error inserting record:", error);
    });

  // const sql =
  //   "INSERT INTO records (username, language, stdin, code) VALUES (?, ?, ?, ?)";
  // const values = [username, language, stdin, code];

  // // Execute the query
  // sequelize.query(sql, values, (error, results, fields) => {
  //   if (error) {
  //     console.error("Error inserting record:", error);
  //     return;
  //   }
  //   console.log("Record inserted successfully:", results);
  // });

  // sequelize
  //   .query("INSERT INTO records (username) VALUES (?)", {
  //     replacements: [username],
  //     type: sequelize.QueryTypes.INSERT,
  //   })
  //   .then((results) => {
  //     console.log("Record inserted successfully:", results);
  //   })
  //   .catch((error) => {
  //     console.error("Error inserting record:", error);
  //   });
};
