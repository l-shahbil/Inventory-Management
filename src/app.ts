import express from 'express';

import employeeRoutes from './routes/Admin/employeeRoutes';
import supplierRoutes from "./routes/Admin/supplierRoutes"
import productRoutes from './routes/Admin/productRoutes';
import categoryRoutes from "./routes/Admin/categoryRoutes"
import MinInvetoryRoutes from './routes/Admin/MinInvetoryRoutes'
import InvoiceRoutes from './routes/Admin/InvoiceRoutes'
import IncomingRoutes from './routes/Admin/IncomingRoutes'
import authRoutes from './routes/Auth/authRoutes';
import { seedAdmin } from './services/seedAdminService';

const app = express();
seedAdmin();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/MinInvetory', MinInvetoryRoutes);
app.use('/api/Invoice', InvoiceRoutes);
app.use('/api/Incoming', IncomingRoutes);



export default app;
