import {sequelize} from "../services/sequelize.service";
import {DataTypes} from "sequelize";
import crypto from "crypto";

const Note = sequelize.define('Note',
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(),
    }
  },
  {
    timestamps: false,
    tableName: "Notes",
    freezeTableName: true,
  },
);

export default Note;

