const Sequelize = require("sequelize");

module.exports = class Game extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        answer: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        wrongAnswer: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER(30),
          allowNull: false,
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
