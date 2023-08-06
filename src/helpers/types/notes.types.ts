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