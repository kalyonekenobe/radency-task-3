import { Injectable } from '@nestjs/common';
import {Note, NoteCreateType, NoteStats} from "../types/notes.types";
import {storage} from "../utils/storage";
import {NotesHandler} from "../utils/notes-handler";

@Injectable()
export class AppService {

  async getNotes(): Promise<Note[]> {
    return await new Promise(resolve => resolve(storage.notes));
  }

  async getNotesStats(): Promise<NoteStats[]> {
    const stats = storage.categories.map(category => ({
      noteCategory: category,
      activeNotes: storage.notes.filter(note => note.category === category && !note.isArchived).length,
      archivedNotes: storage.notes.filter(note => note.category === category && note.isArchived).length
    } as NoteStats));

    return new Promise(resolve => resolve(stats));
  }

  async getNote(id: string): Promise<Note> {
    const note = storage.notes.find(note => note.id === id);

    if (!note) {
      throw new Error('Note with such id was not found!');
    }

    return new Promise(resolve => resolve(note));
  }

  async createNote(note: NoteCreateType): Promise<Note> {
    const { name, content, category, isArchived } = note;
    const createdNote = NotesHandler.create(name, content, category, isArchived);

    storage.notes = [ ...storage.notes, createdNote ];

    return new Promise(resolve => resolve(createdNote));
  }

  async updateNote(note: Note): Promise<Note> {
    const oldNote = storage.notes.find(noteInStorage => noteInStorage.id === note.id);

    if (!oldNote) {
      throw new Error('Note with such id was not found!');
    }

    note = NotesHandler.normalize(note);

    storage.notes = storage.notes.map(noteInStorage => noteInStorage.id === note.id ? note : noteInStorage);

    return new Promise(resolve => resolve(note));
  }

  async removeNote(id: string): Promise<Note> {
    const deletedNote = storage.notes.find(note => note.id === id);

    if (!deletedNote) {
      throw new Error('Note with such id was not found!');
    }

    storage.notes = storage.notes.filter(note => note.id !== id);

    return new Promise(resolve => resolve(deletedNote));
  }
}
