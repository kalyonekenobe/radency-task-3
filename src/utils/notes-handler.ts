import {DATE_REGEX} from "./regular-expressions";
import * as crypto from "crypto";
import {Category} from "../types/categories.types";
import {Note} from "../types/notes.types";

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

  // Automatically recalculates some fields of class Note (Example: 'dates' field is recalculated based on
  // 'content' field)
  static normalize(note: Note): Note {

    return {
      ...note,
      dates: note.content.match(DATE_REGEX) ?? []
    };
  }
}