import express from "express";
import bodyParser from "body-parser";
import userRouter from "./src/Routes/UserRoutes.js";
import cors from "cors";
import { ChatDB } from "./src/Database/Config.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: true, // If cookies or credentials are used
  })
);
app.use(bodyParser.json());

// Connect to database
ChatDB();

// Use user routes
app.use("/api/auth", userRouter);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
