import {sequelize} from "../services/sequelize.service";
import {DataTypes} from "sequelize";
import crypto from "crypto";

const Category = sequelize.define('Category',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => crypto.randomUUID(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Categories",
    freezeTableName: true,
  },
);

export default Category;