"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const storage_1 = require("../storage");
exports.default = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().strict(true).min(1, "Note name cannot be empty!").required("Note name is required!"),
        content: (0, yup_1.string)().strict(true).min(1, "Note content cannot be empty!").required("Note content is required!"),
        category: (0, yup_1.string)().strict(true).oneOf(storage_1.storage.categories, "There is no any category with such name!").required("Note category is required!"),
        isArchived: (0, yup_1.boolean)().strict(true).required("Note isArchived is required!"),
    }),
});
