import { Router } from 'express';
import { addEmployee,updateEmployee,deleteEmployee,getAllEmployees} from '../controller/employeeController';

const router = Router();

router.post("/",addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/', getAllEmployees);

export default router;
