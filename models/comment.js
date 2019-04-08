module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING
    }
  });

  Comment.associate = models => {
    Comment.belongsTo(models.article, {
      foreignKey: "articleId"
    });
  };

  return Comment;
};
