const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
        },
        // RetweetId
      },
      {
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // post.addHashtags
    db.Post.hasMany(db.Comment); // post.addComments, post.getComments
    db.Post.hasMany(db.Image); // post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // post.addLikers, post.removeLikers
    db.Post.belongsToMany(db.User, { through: "Bookmark", as: "Bookmarks" }); // post.addBookmarks, post.removeBookmarks
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // post.addRetweet
  }
};
