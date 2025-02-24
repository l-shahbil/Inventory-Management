import express from 'express';

import employeeRoutes from './routes/employeeRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';



const app = express();

app.use(express.json());

//app.use('/api/employees', employeeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); 



export default app;
