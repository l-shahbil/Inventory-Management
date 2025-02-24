import cors from "cors"; 
import { Request, Response } from "express";


const express =require("express");


import productRoutes from "./routes/product.routes";

const app = express();


app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("🚀 API is running...");
});

import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);



app.listen(4000,console.log(`server running on port ${4000}`))