import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "https://job-portal-frontend-teal-zeta.vercel.app", // your Vercel frontend URL
  credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
  res.send("Job Portal Backend is Running ✅");
});


app.all("/api/*", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.listen(PORT, () => {
  connectDB(); 
  console.log(`🚀 Server running at port ${PORT}`);
});
