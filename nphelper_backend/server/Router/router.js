import Router from 'express';
import QueryController from '../QueryController/QueryController.js';

const router = new Router();

router.post('/', QueryController.deleteMany);
router.post('/queries', QueryController.create);
router.get('/queries/:id', QueryController.getOne);
router.get('/queries', QueryController.getAll);
router.put('/queries', QueryController.update);
router.delete('/queries/:id', QueryController.delete);

export default router;
