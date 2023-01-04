const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "next_engword",
    host: "127.0.0.2",
    dialect: "mysql",
    timestamps: true,
    timezone: "Asia/Seoul",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "next_engword",
    host: "127.0.0.2",
    dialect: "mysql",
    timestamps: true,
    timezone: "Asia/Seoul",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "next_engword",
    host: "127.0.0.2",
    dialect: "mysql",
    timestamps: true,
    timezone: "Asia/Seoul",
  },
};
