const Sequelize = require("sequelize");

module.exports = class Game extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        answer: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        wrongAnswer: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        score: {
          type: Sequelize.INTEGER(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Game",
        tableName: "games",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Game.belongsTo(db.User);
  }
};
