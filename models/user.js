module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user1", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    },
    artId: {
      type: DataTypes.INTEGER
    },
    avatar: {
      type: DataTypes.BLOB("long")
    },
    fbId: DataTypes.STRING,
    googleId: DataTypes.STRING
  });

  User.associate = models => {
    User.hasMany(models.article, {
      foreignKey: "articleId"
    });
  };

  return User;
};
