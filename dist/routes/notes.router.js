"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_repository_1 = require("../repositories/notes.repository");
const router = (0, express_1.Router)();
router.post('/notes', notes_repository_1.create);
router.delete('/notes/:id', notes_repository_1.remove);
router.patch('/notes/:id', notes_repository_1.update);
router.get('/notes/:id', notes_repository_1.fetchOneById);
router.get('/notes', notes_repository_1.fetchAll);
router.get('/notes/stats', notes_repository_1.fetchStats);
exports.default = router;
