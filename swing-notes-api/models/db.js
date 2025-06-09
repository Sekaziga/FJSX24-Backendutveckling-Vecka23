// db.js
export const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL
);
`;

export const createNotesTable = `
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(50) NOT NULL,
  text VARCHAR(300) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId INTEGER REFERENCES users(id)
);
`;
