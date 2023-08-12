import {Category} from "./categories.types";

export type Note = {
  id: string,
  name: string,
  content: string,
  category: Category,
  dates: string[],
  isArchived: boolean,
  createdAt: number,
};

export type NoteStats = {
  noteCategory: Category,
  archivedNotes: number,
  activeNotes: number
};

export type NoteCreateType = {
  name: string,
  content: string,
  category: Category,
  isArchived: boolean
};

export type NoteEditType = {
  name: string,
  content: string,
  category: Category,
  isArchived: boolean
};