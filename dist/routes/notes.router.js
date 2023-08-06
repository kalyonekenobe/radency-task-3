"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_repository_1 = require("../repositories/notes.repository");
const request_validation_service_1 = require("../services/request-validation.service");
const create_note_schema_1 = __importDefault(require("../helpers/schemas/create-note.schema"));
const edit_note_schema_1 = __importDefault(require("../helpers/schemas/edit-note.schema"));
const router = (0, express_1.Router)();
router.get('/notes', notes_repository_1.fetchAll);
router.get('/notes/stats', notes_repository_1.fetchStats);
router.get('/notes/:id', notes_repository_1.fetchOneById);
router.post('/notes', (0, request_validation_service_1.validate)(create_note_schema_1.default, 409), notes_repository_1.create);
router.patch('/notes/:id', (0, request_validation_service_1.validate)(edit_note_schema_1.default, 409), notes_repository_1.update);
router.delete('/notes/:id', notes_repository_1.remove);
exports.default = router;
