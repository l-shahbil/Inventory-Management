import express from 'express';

import employeeRoutes from './routes/employeeRoutes';
import supplierRoutes from "./routes/supplierRoutes"


const app = express();

app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/suppliers', supplierRoutes);

export default app;
