import { Router } from 'express';
import { addsupplier,updatesupplier,deletesupplier,getAllsuppliers } from '../controller/supplierController';

const router = Router();

router.post("/",addsupplier);
router.put('/:id', updatesupplier);
router.delete('/:id', deletesupplier);
router.get('/', getAllsuppliers);

export default router;
