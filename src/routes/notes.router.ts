import {Router} from "express";
import {create, fetchAll, fetchOneById, fetchStats, remove, update} from "../repositories/note.repository";

const router = Router();

router.post('/notes', create);
router.delete('/notes/:id', remove);
router.patch('/notes/:id', update);
router.get('/notes/:id', fetchOneById);
router.get('/notes', fetchAll);
router.get('/notes/stats', fetchStats);

export default router;