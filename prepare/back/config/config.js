const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "next_engword",
    host: "127.0.0.1",
    dialect: "mysql",
    timestamps: true,
    timezone: "Asia/Seoul",
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
    },
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "next_engword",
    host: "127.0.0.1",
    dialect: "mysql",
    timestamps: true,
    timezone: "Asia/Seoul",
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
    },
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "next_engword",
    host: "127.0.0.1",
    dialect: "mysql",
    timestamps: true,
    timezone: "Asia/Seoul",
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
    },
  },
};
