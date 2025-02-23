"use strict";
const express = require("express");
const userRoutes = require("./Routes/Users");
const postRoutes = require("./Routes/Posts");
const app = express();
app.use(express.json());
app.listen(4000, console.log(`server running on port ${4000}`));
