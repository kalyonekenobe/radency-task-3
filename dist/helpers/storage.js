"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const notes_handler_1 = require("./notes-handler");
exports.storage = {
    categories: ['Task', 'Random Thought', 'Idea', 'Quote'],
    notes: [
        notes_handler_1.NotesHandler.create('Shopping list', 'Tomatoes, bread', 'Task'),
        notes_handler_1.NotesHandler.create('The theory of evolution', 'The evolution is the change in heritable characteristics of biological populations over successive generations.', 'Random Thought'),
        notes_handler_1.NotesHandler.create('New Feature', 'Implemented new feature on the 3/5/2021, I will send it for test on 5/5/2021', 'Idea'),
        notes_handler_1.NotesHandler.create('William Gaddis', 'Power doesn\'t corrupt people, people corrupt power.', 'Quote'),
        notes_handler_1.NotesHandler.create('Books', 'The Lean Startup', 'Task'),
        notes_handler_1.NotesHandler.create('Health', 'I’m gonna have a dentist appointment on 08/03/2023', 'Idea'),
        notes_handler_1.NotesHandler.create('Travelling', 'I would like to move to Norway', 'Random Thought'),
    ],
};
