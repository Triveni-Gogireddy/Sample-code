import { connection } from "../Utiles/db.js";
import { createUserTable } from "./userModel.js";

const tablesToCreate = [
    {
      tableName: "User",
      sql: createUserTable,
    },]

    export const createTables = () => {
        for (const table of tablesToCreate) {
          connection.query(table.sql, (err) => {
            if (err) throw err;
            console.log(`${table.tableName} table created successfully!`);
          });
        }
      };