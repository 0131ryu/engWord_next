const Sequelize = require("sequelize");

module.exports = class Word extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        english: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        korean: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING(30),
          defaultValue: "A",
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Word",
        tableName: "words",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Word.belongsTo(db.User);
  }
};
