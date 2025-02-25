import express from 'express';

import employeeRoutes from './routes/employeeRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from "./routes/categoryRoutes"
import MinInvetoryRoutes from './routes/MinInvetoryRoutes'
import InvoiceRoutes from './routes/InvoiceRoutes'
import IncomingRoutes from './routes/IncomingRoutes'




const app = express();

app.use(express.json());

//app.use('/api/employees', employeeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/MinInvetory', MinInvetoryRoutes);
app.use('/api/Invoice', InvoiceRoutes);
app.use('/api/Incoming', IncomingRoutes);




export default app;
