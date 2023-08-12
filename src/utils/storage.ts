import {Note} from "../types/notes.types";
import {NotesHandler} from "./notes-handler";
import {Category} from "../types/categories.types";

type Storage = {
  notes: Note[],
  categories: Category[],
};

export const storage: Storage = {
  categories: [ 'Task', 'Random Thought', 'Idea', 'Quote' ],
  notes: [
    NotesHandler.create('Shopping list', 'Tomatoes, bread', 'Task'),
    NotesHandler.create('The theory of evolution', 'The evolution is the change in heritable characteristics of biological populations over successive generations.', 'Random Thought'),
    NotesHandler.create('New Feature', 'Implemented new feature on the 3/5/2021, I will send it for test on 5/5/2021', 'Idea'),
    NotesHandler.create('William Gaddis', 'Power doesn\'t corrupt people, people corrupt power.', 'Quote'),
    NotesHandler.create('Books', 'The Lean Startup', 'Task'),
    NotesHandler.create('Health', 'I’m gonna have a dentist appointment on 08/03/2023', 'Idea'),
    NotesHandler.create('Travelling', 'I would like to move to Norway', 'Random Thought'),
  ],
};