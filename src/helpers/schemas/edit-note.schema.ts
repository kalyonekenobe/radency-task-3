import {boolean, object, string} from "yup";

export default object({
  body: object({
    name: string().strict(true).min(1, "Note name cannot be empty!").required("Note name is required!"),
    content: string().strict(true).min(1, "Note content cannot be empty!").required("Note content is required!"),
    category: string().strict(true).required("Note category is required!"),
    isArchived: boolean().strict(true).required("Note isArchived is required!"),
  }),
});