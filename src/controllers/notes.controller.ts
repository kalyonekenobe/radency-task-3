import {Request, Response} from "express";
import {NotesHandler} from "../helpers/notes-handler";
import {Note} from "../helpers/types/notes.types";
import NoteModel from "../models/note.model";
import CategoryModel from "../models/category.model";
import {DATE_REGEX} from "../helpers/regular-expressions";

const create = async (req: Request, res: Response) => {
  try {
    const { name, content, category: categoryName, isArchived } = req.body;

    const category = await CategoryModel.findOne({ where: { name: categoryName } });

    if (!category) {
      return res.status(409).json({ error: 'Category with such name does not exist!' });
    }

    const note = await NoteModel.create({ name, content, categoryId: category.get('id'), isArchived, dates: content.match(DATE_REGEX) });

    return res.status(201).json({ createdNote: note });
  } catch (error) {
    console.log(error);
  }

  return res.status(400).json({ error: 'Bad request' });
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findOne({
      where: {
        id: id
      },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note with such id was not found!' });
    }

    await NoteModel.destroy({ where: { id: note?.get('id') } });

    return res.status(200).json({ deletedNote: note });
  } catch (error) {
    console.log(error);
  }

  return res.status(400).json({ error: 'Bad request' });
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findOne({
      where: {
        id: id
      },
      raw: true
    });

    if (!note) {
      return res.status(404).json({ error: 'Note with such id was not found!' });
    }

    const { name, content, category: categoryName, isArchived } = req.body;
    const category = await CategoryModel.findOne({ where: { name: categoryName } });

    if (!category) {
      return res.status(409).json({ error: 'Category with such name does not exist!' });
    }

    const updatedNote = NotesHandler.normalize({ ...JSON.parse(JSON.stringify(note)) as Note, name, content, categoryId: category.get('id'), isArchived } as Note);

    await NoteModel.update({ ...updatedNote }, { where: { id: updatedNote.id } });

    return res.status(200).json({ oldNote: note, updatedNote: updatedNote });
  } catch (error) {
    console.log(error);
  }

  return res.status(400).json({ error: 'Bad request' });
};

const fetchOneById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findOne({
      where: {
        id: id
      },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note with such id was not found!' });
    }

    return res.status(200).json(note);
  } catch (error) {
    console.log(error);
  }

  return res.status(400).json({ error: 'Bad request' });
};

const fetchAll = async (req: Request, res: Response) => {
  const notes = await NoteModel.findAll();
  return res.status(200).json(notes);
};

const fetchStats = async (req: Request, res: Response) => {
  const categories = await CategoryModel.findAll();
  const stats = categories.map(async category => {

    const activeNotes = await NoteModel.findAll({
      where: {
        isArchived: false,
        categoryId: category.get('id'),
      },
    });

    const archivedNotes = await NoteModel.findAll({
      where: {
        isArchived: true,
        categoryId: category.get('id'),
      },
    });

    return {
      noteCategory: category.get('name'),
      activeNotes: activeNotes.length,
      archivedNotes: archivedNotes.length,
    };
  });

  return res.status(200).json(await Promise.all(stats));
};

export { create, remove, update, fetchOneById, fetchStats, fetchAll };