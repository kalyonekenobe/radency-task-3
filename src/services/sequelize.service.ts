import {Sequelize} from "sequelize";

export const sequelize = new Sequelize('postgres://postgres:password@database/notes_app_db');

export const configureSequelize = async (callback: () => any) => {
  let isAuthenticated = false;

  while (!isAuthenticated) {
    try {
      isAuthenticated = true;
      await sequelize.authenticate();
    } catch (error) {
      isAuthenticated = false;
    }
  }

  callback();
};