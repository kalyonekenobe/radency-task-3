import {Note} from "./types/notes.types";
import {DATE_REGEX} from "./regular-expressions";
import {Category} from "./types/categories.types";
import crypto from "crypto";

export class NotesHandler {

  static create(name: string, content: string, category: Category, isArchived: boolean = false): Note {

    return {
      id: crypto.randomUUID(),
      name: name,
      content: content,
      category: category,
      dates: content.match(DATE_REGEX) ?? [],
      isArchived: isArchived,
      createdAt: Date.now(),
    };
  }

  static normalize(note: Note): Note {

    return {
      ...note,
      dates: note.content.match(DATE_REGEX) ?? []
    };
  }
}