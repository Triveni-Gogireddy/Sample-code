export const createUserTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        mobilenumber VARCHAR(15),
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );`;