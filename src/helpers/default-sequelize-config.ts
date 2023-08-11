import NoteModel from "../models/note.model";
import CategoryModel from "../models/category.model";
import {NotesHandler} from "./notes-handler";

const initializeForeignKeys = () => {
  NoteModel.belongsTo(CategoryModel, {
    foreignKey: {
      name: 'categoryId',
      allowNull: false,
    },
    targetKey: 'id'
  });
};

const initializeTables = async () => {
  await NoteModel.sync({ alter: true });
  console.log('Note model synced');

  await CategoryModel.sync({ alter: true });
  console.log('Category model synced');
};

const initializeCategories = async () => {
  await CategoryModel.create({ name: 'Task' });
  await CategoryModel.create({ name: 'Random Thought' });
  await CategoryModel.create({ name: 'Idea' });
  await CategoryModel.create({ name: 'Quote' });
};

const initializeNotes = async () => {
  const taskCategory = await CategoryModel.findOne({ where: { name: 'Task' }});
  const randomThoughtCategory =  await CategoryModel.findOne({ where: { name: 'Random Thought' }});
  const ideaCategory = await CategoryModel.findOne({ where: { name: 'Idea' }});
  const quoteCategory = await CategoryModel.findOne({ where: { name: 'Quote' }});

  await NoteModel.create(NotesHandler.normalize({ name: 'Shopping list', content: 'Tomatoes, bread', categoryId: taskCategory?.get('id') }));
  await NoteModel.create(NotesHandler.normalize({ name: 'The theory of evolution', content: 'The evolution is the change in heritable characteristics of biological populations over successive generations.', categoryId: randomThoughtCategory?.get('id') }));
  await NoteModel.create(NotesHandler.normalize({ name: 'New Feature', content: 'Implemented new feature on the 3/5/2021, I will send it for test on 5/5/2021', categoryId: ideaCategory?.get('id') }));
  await NoteModel.create(NotesHandler.normalize({ name: 'William Gaddis', content: 'Power doesn’t corrupt people, people corrupt power.', categoryId: quoteCategory?.get('id') }));
  await NoteModel.create(NotesHandler.normalize({ name: 'Books', content: 'The Lean Startup', categoryId: taskCategory?.get('id') }));
  await NoteModel.create(NotesHandler.normalize({ name: 'Health', content: 'I’m gonna have a dentist appointment on 08/03/2023', categoryId: ideaCategory?.get('id') }));
  await NoteModel.create(NotesHandler.normalize({ name: 'Travelling', content: 'I would like to move to Norway', categoryId: randomThoughtCategory?.get('id') }));
};

const defaultConfiguration = async () => {
  initializeForeignKeys();

  try {
    await initializeTables();
  } catch {
    console.log('Database initialization error!');
  }

  try {
    await initializeCategories();

    try {
      await initializeNotes();
    } catch {
      console.log('Notes were already initialized!');
    }
  } catch {
    console.log('Categories were already initialized!');
  }
};

export default defaultConfiguration;