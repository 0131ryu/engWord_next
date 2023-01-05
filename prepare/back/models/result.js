const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Result extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        score: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Result",
        tableName: "results",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Result.belongsTo(db.User);
    db.Result.belongsTo(db.Game);
  }
};
