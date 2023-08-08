import {Router} from "express";
import {create, fetchAll, fetchOneById, fetchStats, remove, update} from "../controllers/notes.controller";
import {validate} from "../services/request-validation.service";
import CreateNoteSchema from "../helpers/schemas/create-note.schema";
import EditNoteSchema from "../helpers/schemas/edit-note.schema";

const router = Router();

router.get('/notes', fetchAll);
router.get('/notes/stats', fetchStats);
router.get('/notes/:id', fetchOneById);
router.post('/notes', validate(CreateNoteSchema, 409), create);
router.patch('/notes/:id', validate(EditNoteSchema, 409), update);
router.delete('/notes/:id', remove);

export default router;