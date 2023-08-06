"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAll = exports.fetchStats = exports.fetchOneById = exports.update = exports.remove = exports.create = void 0;
const storage_1 = require("../helpers/storage");
const notes_handler_1 = require("../helpers/notes-handler");
const create = (req, res) => {
    const { name, content, category, isArchived } = req.body;
    const note = notes_handler_1.NotesHandler.create(name, content, category, isArchived);
    storage_1.storage.notes = [...storage_1.storage.notes, note];
    return res.status(201).json({ createdNote: note });
};
exports.create = create;
const remove = (req, res) => {
    const { id } = req.params;
    const note = storage_1.storage.notes.find(note => note.id === id);
    if (!note) {
        res.status(404).json({ error: 'Note with such id was not found!' });
    }
    storage_1.storage.notes = storage_1.storage.notes.filter(note => note.id !== id);
    return res.status(200).json({ deletedNote: note });
};
exports.remove = remove;
const update = (req, res) => {
    const { id } = req.params;
    const note = storage_1.storage.notes.find(note => note.id === id);
    if (!note) {
        res.status(404).json({ error: 'Note with such id was not found!' });
    }
    const { name, content, category, isArchived } = req.body;
    const updatedNote = notes_handler_1.NotesHandler.normalize(Object.assign(Object.assign({}, note), { name, content, category, isArchived }));
    storage_1.storage.notes = storage_1.storage.notes.map(note => note.id === id ? updatedNote : note);
    return res.status(200).json({ oldNote: note, updatedNote: updatedNote });
};
exports.update = update;
const fetchOneById = (req, res) => {
    const { id } = req.params;
    const note = storage_1.storage.notes.find(note => note.id === id);
    if (!note) {
        res.status(404).json({ error: 'Note with such id was not found!' });
    }
    return res.status(200).json(storage_1.storage.notes.find(note => note.id === id));
};
exports.fetchOneById = fetchOneById;
const fetchAll = (req, res) => {
    return res.status(200).json(storage_1.storage.notes);
};
exports.fetchAll = fetchAll;
const fetchStats = (req, res) => {
    const stats = storage_1.storage.categories.map(category => ({
        noteCategory: category,
        activeNotes: storage_1.storage.notes.filter(note => note.category === category && !note.isArchived).length,
        archivedNotes: storage_1.storage.notes.filter(note => note.category === category && note.isArchived).length,
    }));
    return res.status(200).json(stats);
};
exports.fetchStats = fetchStats;
