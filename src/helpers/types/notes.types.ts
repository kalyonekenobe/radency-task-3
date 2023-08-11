import {Category} from "./categories.types";

export type Note = {
  id: string,
  name: string,
  content: string,
  categoryId: string,
  dates: string[],
  isArchived: boolean,
  createdAt: number,
};