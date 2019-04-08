module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    header: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING(2555),
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue("comments").split(";");
      },
      set(val) {
        this.setDataValue("comments", val.join(";"));
      }
    },
    photo: {
      type: DataTypes.BLOB("long")
    },
    author: {
      type: DataTypes.STRING
    },
    likes: {
      type: DataTypes.INTEGER
    },
    tag: {
      type: DataTypes.STRING
    }
  });

  Article.associate = models => {
    Article.belongsTo(models.user1, {
      foreignKey: "userId"
    });
  };

  return Article;
};
