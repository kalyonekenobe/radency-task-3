import {Note} from "./types/notes.types";
import {DATE_REGEX} from "./regular-expressions";
import {Category} from "./types/categories.types";
import crypto from "crypto";

export class NotesHandler {

  static create(name: string, content: string, categoryId: string, isArchived: boolean = false): Note {

    return {
      id: crypto.randomUUID(),
      name: name,
      content: content,
      categoryId: categoryId,
      dates: content.match(DATE_REGEX) ?? [],
      isArchived: isArchived,
      createdAt: Date.now(),
    };
  }

  // Automatically recalculates some fields of class Note (Example: 'dates' field is recalculated based on
  // 'content' field)
  static normalize(note: any): Note {

    return {
      ...note,
      dates: note.content.match(DATE_REGEX) ?? []
    };
  }
}