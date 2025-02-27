import { Router } from 'express';
import { addsupplier,updatesupplier,deletesupplier,getAllsuppliers } from '../../controller/Admin/supplierController';
import { authenticate, authorize } from '../../middleware/authMiddleware';


const router = Router();

router.post("/",authenticate,authorize(["ADMIN"]),addsupplier);
router.put('/:id',authenticate,authorize(["ADMIN"]), updatesupplier);
router.delete('/:id',authenticate,authorize(["ADMIN"]), deletesupplier);
router.get('/', authenticate,authorize(["ADMIN","EMPLOYEE"]),getAllsuppliers);

export default router;
