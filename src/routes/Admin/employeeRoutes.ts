import { Router } from 'express';
import { addEmployee,updateEmployee,deleteEmployee,getAllEmployees} from '../../controller/Admin/employeeController';
import { authenticate, authorize } from '../../middleware/authMiddleware';


const router = Router();

router.post("/" ,authenticate,authorize(["ADMIN"]),addEmployee);
router.put('/:id',authenticate,authorize(["ADMIN"]),updateEmployee);
router.delete('/:id',authenticate,authorize(["ADMIN"]),deleteEmployee);
router.get('/',authenticate,authorize(["ADMIN"]), getAllEmployees);

export default router;
