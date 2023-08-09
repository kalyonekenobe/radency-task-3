import {boolean, object, string} from "yup";
import {storage} from "../storage";

export default object({
  body: object({
    name: string().strict(true).min(1, "Note name cannot be empty!").required("Note name is required!"),
    content: string().strict(true).min(1, "Note content cannot be empty!").required("Note content is required!"),
    category: string().strict(true).oneOf(storage.categories, "There is no any category with such name!").required("Note category is required!"),
    isArchived: boolean().strict(true).required("Note isArchived is required!"),
  }),
});