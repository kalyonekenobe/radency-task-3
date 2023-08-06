"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesHandler = void 0;
const regular_expressions_1 = require("./regular-expressions");
const crypto_1 = __importDefault(require("crypto"));
class NotesHandler {
    static create(name, content, category, isArchived = false) {
        var _a;
        return {
            id: crypto_1.default.randomUUID(),
            name: name,
            content: content,
            category: category,
            dates: (_a = content.match(regular_expressions_1.DATE_REGEX)) !== null && _a !== void 0 ? _a : [],
            isArchived: isArchived,
            createdAt: Date.now(),
        };
    }
    // Automatically recalculates some fields of class Note (Example: 'dates' field is recalculated based on
    // 'content' field)
    static normalize(note) {
        var _a;
        return Object.assign(Object.assign({}, note), { dates: (_a = note.content.match(regular_expressions_1.DATE_REGEX)) !== null && _a !== void 0 ? _a : [] });
    }
}
exports.NotesHandler = NotesHandler;
