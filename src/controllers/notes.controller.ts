import {Request, Response} from "express";
import {storage} from "../helpers/storage";
import {NotesHandler} from "../helpers/notes-handler";
import {Note} from "../helpers/types/notes.types";

const create = (req: Request, res: Response) => {
  const { name, content, category, isArchived } = req.body;
  const note = NotesHandler.create(name, content, category, isArchived);

  storage.notes = [ ...storage.notes, note ];

  return res.status(201).json({ createdNote: note });
};

const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  const note = storage.notes.find(note => note.id === id);

  if (!note) {
    res.status(404).json({ error: 'Note with such id was not found!' });
  }

  storage.notes = storage.notes.filter(note => note.id !== id);

  return res.status(200).json({ deletedNote: note });
};

const update = (req: Request, res: Response) => {
  const { id } = req.params;
  const note = storage.notes.find(note => note.id === id);

  if (!note) {
    res.status(404).json({ error: 'Note with such id was not found!' });
  }

  const { name, content, category, isArchived } = req.body;
  const updatedNote = NotesHandler.normalize({ ...note, name, content, category, isArchived } as Note);

  storage.notes = storage.notes.map(note => note.id === id ? updatedNote : note);

  return res.status(200).json({ oldNote: note, updatedNote: updatedNote });
};

const fetchOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  const note = storage.notes.find(note => note.id === id);

  if (!note) {
    res.status(404).json({ error: 'Note with such id was not found!' });
  }

  return res.status(200).json(storage.notes.find(note => note.id === id));
};

const fetchAll = (req: Request, res: Response) => {
  return res.status(200).json(storage.notes);
};

const fetchStats = (req: Request, res: Response) => {
  const stats = storage.categories.map(category => ({
    noteCategory: category,
    activeNotes: storage.notes.filter(note => note.category === category && !note.isArchived).length,
    archivedNotes: storage.notes.filter(note => note.category === category && note.isArchived).length,
  }));

  return res.status(200).json(stats);
};

export { create, remove, update, fetchOneById, fetchStats, fetchAll };